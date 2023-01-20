package ro.ubb.mp.service.appointment;

import lombok.Data;
import lombok.Getter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ro.ubb.mp.controller.dto.request.AppointmentRequestDTO;
import ro.ubb.mp.dao.model.Appointment;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.dao.repository.AppointmentRepository;
import ro.ubb.mp.service.user.UserService;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service("appointmentService")
@Data
@Getter
public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentRepository repository;
    private final UserService userService;

    @Override
    public Optional<Appointment> getAppointmentById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Appointment createAppointment(AppointmentRequestDTO appointmentRequestDTO) {
        final User student = getUserService().getUserById(appointmentRequestDTO.getStudentId())
                .orElseThrow(EntityNotFoundException::new);
        final User mentor = getUserService().getUserById(appointmentRequestDTO.getMentorId())
                .orElseThrow(EntityNotFoundException::new);

        final Appointment appointmentToBeSaved = Appointment.builder()
                .student(student)
                .mentor(mentor)
                .date(appointmentRequestDTO.getDate())
                .locationDetails(appointmentRequestDTO.getLocationDetails())
                .build();

        return repository.save(appointmentToBeSaved);
    }


    @Override
    public void deleteAppointmentById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Appointment updateAppointment(AppointmentRequestDTO appointmentRequestDTO, Long id) {
        Appointment appointment = repository.findById(id).orElseThrow(EntityNotFoundException::new);

        if (!(appointmentRequestDTO.getLocationDetails().isEmpty() || appointmentRequestDTO.getLocationDetails().isBlank())) {
            appointment.setLocationDetails(appointmentRequestDTO.getLocationDetails());
        }

        if (appointmentRequestDTO.getDate() != null) {
            appointment.setDate(appointmentRequestDTO.getDate());
        }

        return repository.save(appointment);
    }


    @Override
    public List<Appointment> getAppointmentsStudentPaginated(User student, Integer pageNo, Integer pageSize) {
        Pageable firstPageWithLimitElement = PageRequest.of(pageNo, pageSize).withSort(Sort.Direction.ASC, "date");
        Page<Appointment> page = repository.getAppointmentsByStudent(student, firstPageWithLimitElement);

        return page.getContent().stream().toList();

    }

    public Page<Appointment> getPageStudent(User user, Integer pageNo, Integer pageSize) {
        Pageable firstPageWithLimitElement = PageRequest.of(pageNo, pageSize).withSort(Sort.Direction.ASC, "date");
        return repository.getAppointmentsByStudent(user, firstPageWithLimitElement);
    }

    public Page<Appointment> getPageMentor(User user, Integer pageNo, Integer pageSize) {
        Pageable firstPageWithLimitElement = PageRequest.of(pageNo, pageSize).withSort(Sort.Direction.ASC, "date");
        return repository.getAppointmentsByMentor(user, firstPageWithLimitElement);
    }

    @Override
    public List<Appointment> getAppointmentsMentorPaginated(User mentor, Integer pageNo, Integer pageSize) {
        Pageable firstPageWithLimitElement = PageRequest.of(pageNo, pageSize).withSort(Sort.Direction.ASC, "date");
        Page<Appointment> page = repository.getAppointmentsByMentor(mentor, firstPageWithLimitElement);

        return page.getContent().stream().toList();
    }


}
