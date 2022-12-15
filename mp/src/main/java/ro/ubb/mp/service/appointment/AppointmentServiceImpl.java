package ro.ubb.mp.service.appointment;

import lombok.Data;
import lombok.Getter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import ro.ubb.mp.controller.dto.request.AppointmentRequestDTO;
import ro.ubb.mp.controller.dto.response.AppointmentResponseDTO;
import ro.ubb.mp.controller.dto.response.PageResponseWrapperDTO;

import ro.ubb.mp.dao.model.Appointment;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.dao.repository.AppointmentRepository;
import ro.ubb.mp.service.user.UserService;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service("appointmentService")
@Data
@Getter
public class AppointmentServiceImpl implements AppointmentService{
    private final AppointmentRepository repository;
    private final UserService userService;


    @Transactional
    public Appointment createAppointment(AppointmentRequestDTO appointmentRequestDTO){
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



    public void deleteAppointmentById(Long id){
        repository.deleteById(id);
    }


    @Override
    public PageResponseWrapperDTO<List<AppointmentResponseDTO>> getAppointmentsStudentPaginated(User student, Integer pageNo, Integer pageSize){
        Pageable firstPageWithLimitElement = PageRequest.of(pageNo, pageSize).withSort(Sort.Direction.ASC, "date");
        Page<Appointment> page = repository.getAppointmentsByStudent(student, firstPageWithLimitElement);
        List<AppointmentResponseDTO> appointments = page.getContent()
                .stream()
                .map(appointment -> {
                    return AppointmentResponseDTO
                            .builder()
                            .id(appointment.getId())
                            .date(appointment.getDate())
                            .locationDetails(appointment.getLocationDetails())
                            .build();
                })
                .collect(Collectors.toList());

        return PageResponseWrapperDTO.<List<AppointmentResponseDTO>>builder()
                .pageNr(pageNo)
                .pageSize(pageSize)
                .totalItems(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .value(appointments)
                .build();
    }

    @Override
    public PageResponseWrapperDTO<List<AppointmentResponseDTO>> getAppointmentsMentorPaginated(User mentor, Integer pageNo, Integer pageSize){
        Pageable firstPageWithLimitElement = PageRequest.of(pageNo, pageSize).withSort(Sort.Direction.ASC, "date");
        Page<Appointment> page = repository.getAppointmentsByMentor(mentor, firstPageWithLimitElement);
        List<AppointmentResponseDTO> appointments = page.getContent()
                .stream()
                .map(appointment -> {
                    return AppointmentResponseDTO
                            .builder()
                            .id(appointment.getId())
                            .date(appointment.getDate())
                            .locationDetails(appointment.getLocationDetails())
                            .build();
                })
                .collect(Collectors.toList());

        return PageResponseWrapperDTO.<List<AppointmentResponseDTO>>builder()
                .pageNr(pageNo)
                .pageSize(pageSize)
                .totalItems(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .value(appointments)
                .build();
    }


}
