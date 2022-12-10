package ro.ubb.mp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.ubb.mp.controller.dto.response.AppointmentResponseDTO;
import ro.ubb.mp.dao.model.Appointment;
import ro.ubb.mp.service.appointment.AppointmentService;

import java.util.List;

@RestController
@RequestMapping(name = "appointments")
public class AppointmentController {
    @Autowired
    AppointmentService service;
    //probabil trebuie paginat si aici

    @GetMapping("/student/{id}")
    public ResponseEntity<List<Appointment>> getAllStudentAppointments(@PathVariable("id") Long studentId) {
        return ResponseEntity.ok(service.getAllAppointmentsByStudent(studentId));
    }

    @GetMapping("/mentor/{id}")
    public ResponseEntity<List<Appointment>> getAllMentorAppointments(@PathVariable("id") Long mentorId) {
        return ResponseEntity.ok(service.getAllAppointmentsByMentor(mentorId));
    }
}
