package ro.ubb.mp.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ro.ubb.mp.controller.dto.mapper.AppointmentRequestMapper;
import ro.ubb.mp.controller.dto.mapper.AppointmentResponseMapper;
import ro.ubb.mp.controller.dto.request.AppointmentRequestDTO;
import ro.ubb.mp.controller.dto.response.AppointmentResponseDTO;
import ro.ubb.mp.controller.dto.response.PageResponseWrapperDTO;
import ro.ubb.mp.controller.dto.response.ResponseWrapperDTO;
import ro.ubb.mp.controller.dto.response.user.UserFullNameDTO;
import ro.ubb.mp.dao.model.Appointment;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.service.appointment.AppointmentServiceImpl;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(name = "/appointments")
@Getter
@RequiredArgsConstructor
public class AppointmentController {
    @Autowired
    AppointmentServiceImpl service;
    AppointmentRequestMapper requestMapper;

    final AppointmentResponseMapper responseMapper;


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

    @PostMapping("/create-appointment")
    public ResponseEntity<ResponseWrapperDTO<AppointmentResponseDTO>> createAppointment(@RequestBody AppointmentRequestDTO appointmentRequestDTO){

        if(SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof User user){
            URI uri = URI.create(((ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/create-appointment")
                    .toUriString())));

            AppointmentResponseDTO appointmentResponseDTO = responseMapper
                    .toDTO(getService().createAppointment(appointmentRequestDTO));

            return ResponseEntity.created(uri).body(ResponseWrapperDTO.<AppointmentResponseDTO>builder()
                    .value(appointmentResponseDTO).build());

        }

       return ResponseEntity.badRequest()
               .body(ResponseWrapperDTO.<AppointmentResponseDTO>builder().errorMessage("Bad authentication type").build());
    }


}
