package ro.ubb.mp.service.appointment;

import lombok.Data;
import lombok.Getter;
import org.springframework.stereotype.Service;
import ro.ubb.mp.controller.dto.response.AppointmentResponseDTO;
import ro.ubb.mp.dao.model.Appointment;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.dao.repository.AppointmentRepository;

import java.util.List;

@Service
@Data
@Getter
public class AppointmentService {
    private final AppointmentRepository repository;

    public void saveAppointment(Appointment appointment){
        repository.save(appointment);
    }

    public void createAppointment(){

    }

    public List<Appointment> getAllAppointmentsByStudent(Long studentId){
        return repository.getAppointmentsByStudentId(studentId);
    }

    public List<Appointment> getAllAppointmentsByMentor(Long mentorId){
        return repository.getAppointmentsByMentorId(mentorId);
    }


}
