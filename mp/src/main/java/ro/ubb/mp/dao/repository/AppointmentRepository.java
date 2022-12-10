package ro.ubb.mp.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.ubb.mp.dao.model.Appointment;


import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> getAppointmentsByStudentId(Long studentId);

    List<Appointment> getAppointmentsByMentorId(Long mentorId);

    List<Appointment> getAppointmentsByAnnouncement(Long announcementId);


}
