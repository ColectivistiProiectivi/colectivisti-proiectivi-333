package ro.ubb.mp.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ro.ubb.mp.controller.dto.mapper.AppointmentResponseMapper;
import ro.ubb.mp.controller.dto.mapper.UserFullNameMapper;
import ro.ubb.mp.controller.dto.request.AppointmentRequestDTO;
import ro.ubb.mp.controller.dto.response.AppointmentResponseDTO;
import ro.ubb.mp.controller.dto.response.PageResponseWrapperDTO;
import ro.ubb.mp.controller.dto.response.ResponseWrapperDTO;
import ro.ubb.mp.dao.model.Appointment;
import ro.ubb.mp.dao.model.Role;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.service.appointment.AppointmentServiceImpl;

import javax.persistence.EntityNotFoundException;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/appointments")
@Getter
@RequiredArgsConstructor
public class AppointmentController {
    @Autowired
    AppointmentServiceImpl service;
    final AppointmentResponseMapper responseMapper;
    final UserFullNameMapper fullNameMapper;

    @GetMapping()
    public ResponseEntity<PageResponseWrapperDTO<List<AppointmentResponseDTO>>> getAllAppointments
            (
                    @RequestParam(required = false, defaultValue = "") Integer pageNo,
                    @RequestParam(required = false, defaultValue = "") Integer pageSize
            ) {
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof User user) {
            if (user.getRole().equals(Role.MENTOR)) {
                List<AppointmentResponseDTO> appointmentResponseDTOS = getService().getAppointmentsMentorPaginated(user, pageNo, pageSize)
                        .stream().map(appointment -> getResponseMapper().toDTO(appointment)).toList();

                return ResponseEntity.ok()
                        .body(PageResponseWrapperDTO
                                .<List<AppointmentResponseDTO>>builder().value(appointmentResponseDTOS)
                                .pageSize(pageSize)
                                .pageNr(pageNo)
                                .totalItems(getService().getPageMentor(user, pageNo, pageSize).getTotalElements())
                                .totalPages(getService().getPageMentor(user, pageNo, pageSize).getTotalPages())
                                .build());

            } else if (user.getRole().equals(Role.STUDENT)) {
                List<AppointmentResponseDTO> appointmentResponseDTOS = getService().getAppointmentsStudentPaginated(user, pageNo, pageSize)
                        .stream().map(appointment -> getResponseMapper().toDTO(appointment)).toList();

                return ResponseEntity.ok()
                        .body(PageResponseWrapperDTO
                                .<List<AppointmentResponseDTO>>builder().value(appointmentResponseDTOS)
                                .pageSize(pageSize)
                                .pageNr(pageNo)
                                .totalItems(getService().getPageStudent(user, pageNo, pageSize).getTotalElements())
                                .totalPages(getService().getPageStudent(user, pageNo, pageSize).getTotalPages())
                                .build());
            }


        }

        return ResponseEntity.badRequest().body(PageResponseWrapperDTO
                .<List<AppointmentResponseDTO>>builder()
                .errorMessage("bad authentication type")
                .build());
    }

    @PostMapping()
    public ResponseEntity<ResponseWrapperDTO<AppointmentResponseDTO>> createAppointment(@RequestBody AppointmentRequestDTO appointmentRequestDTO) {

        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof User user) {
            URI uri = URI.create(((ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/appointments")
                    .toUriString())));

            Appointment appointment = getService().createAppointment(appointmentRequestDTO);
            AppointmentResponseDTO appointmentResponseDTO = responseMapper
                    .toDTO(appointment);

            return ResponseEntity.created(uri).body(ResponseWrapperDTO.<AppointmentResponseDTO>builder()
                    .value(appointmentResponseDTO).build());

        }

        return ResponseEntity.badRequest()
                .body(ResponseWrapperDTO.<AppointmentResponseDTO>builder().errorMessage("Bad authentication type").build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deleteAppointment(@PathVariable Long id) {
        final Appointment appointment = getService()
                .getAppointmentById(id)
                .orElseThrow(EntityNotFoundException::new);

        service.deleteAppointmentById(appointment.getId());

        return new ResponseEntity<>(id, HttpStatus.OK);

    }

    @PatchMapping("/{id}")
    public ResponseEntity<ResponseWrapperDTO<AppointmentResponseDTO>> updateAppointment(@PathVariable Long id,
                                                                                        @RequestBody AppointmentRequestDTO appointmentRequestDTO) {
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof User user) {
            Appointment appointment = getService().updateAppointment(appointmentRequestDTO, id);
            AppointmentResponseDTO updatedAppointment = responseMapper
                    .toDTO(appointment);

            return ResponseEntity.ok()
                    .body(ResponseWrapperDTO.<AppointmentResponseDTO>builder().value(updatedAppointment).build());

        }

        return ResponseEntity.badRequest()
                .body(ResponseWrapperDTO.<AppointmentResponseDTO>builder().errorMessage("Bad authentication type").build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseWrapperDTO<AppointmentResponseDTO>> getAppointmentById(@PathVariable Long id) {
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof User user) {

            Appointment appointment = getService().getAppointmentById(id).orElseThrow(EntityNotFoundException::new);
            AppointmentResponseDTO appointmentResponseDTO = responseMapper
                    .toDTO(appointment);


            return ResponseEntity.ok()
                    .body(ResponseWrapperDTO.<AppointmentResponseDTO>builder().value(appointmentResponseDTO).build());
        }

        return ResponseEntity.badRequest()
                .body(ResponseWrapperDTO.<AppointmentResponseDTO>builder().errorMessage("Bad authentication type").build());
    }
}
