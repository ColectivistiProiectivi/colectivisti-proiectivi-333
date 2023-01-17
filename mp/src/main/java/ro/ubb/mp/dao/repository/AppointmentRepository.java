package ro.ubb.mp.dao.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.ubb.mp.dao.model.Appointment;
import ro.ubb.mp.dao.model.User;


import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> getAppointmentsByMentor(User mentor);
    List<Appointment> getAppointmentsByStudent(User student);
}
