package ro.ubb.mp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ro.ubb.mp.controller.dto.response.AppointmentResponseDTO;
import ro.ubb.mp.controller.dto.response.PageResponseWrapperDTO;
import ro.ubb.mp.dao.model.Appointment;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.service.appointment.AppointmentService;

import java.util.List;

@RestController
@RequestMapping(name = "appointments")
public class AppointmentController {
    @Autowired
    AppointmentService service;


    @GetMapping("/student")
    public ResponseEntity<PageResponseWrapperDTO<List<AppointmentResponseDTO>>> getAllStudentAppointments
        (
                @RequestParam(required = false, defaultValue = "") Integer pageNo,
                @RequestParam(required = false, defaultValue = "") Integer pageSize
        )
    {
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof User student){
            return ResponseEntity.ok(service.getAppointmentsStudentPaginated(student, pageNo, pageSize));

        }
        return ResponseEntity.badRequest().body(PageResponseWrapperDTO
                .<List<AppointmentResponseDTO>>builder()
                .errorMessage("bad authentication type")
                .build());
    }

    @GetMapping("/mentor")
    public ResponseEntity<PageResponseWrapperDTO<List<AppointmentResponseDTO>>> getAllMentorAppointments
            (
                    @RequestParam(required = false, defaultValue = "") Integer pageNo,
                    @RequestParam(required = false, defaultValue = "") Integer pageSize
            )
    {
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof User mentor){
            return ResponseEntity.ok(service.getAppointmentsMentorPaginated(mentor, pageNo, pageSize));

        }
        return ResponseEntity.badRequest().body(PageResponseWrapperDTO
                .<List<AppointmentResponseDTO>>builder()
                .errorMessage("bad authentication type")
                .build());
    }
}
