package ro.ubb.mp.controller;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ro.ubb.mp.controller.dto.mapper.AssignmentMapper;
import ro.ubb.mp.controller.dto.request.AssignmentRequestDTO;
import ro.ubb.mp.controller.dto.response.PageResponseWrapperDTO;
import ro.ubb.mp.controller.dto.response.assignment.AssignmentResponseDTO;
import ro.ubb.mp.dao.model.Assignment;
import ro.ubb.mp.dao.model.Role;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.service.assignment.AssignmentService;
import ro.ubb.mp.service.user.UserService;

import javax.persistence.EntityNotFoundException;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/assignments")
@Getter
@RequiredArgsConstructor
public class AssignmentController {
    private final AssignmentService assignmentService;
    private final UserService userService;
    private final AssignmentMapper assignmentMapper;

    @GetMapping()
    public ResponseEntity<PageResponseWrapperDTO<List<AssignmentResponseDTO>>> getAssignmentsForUser() {
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof User user) {
            if (user.getRole().equals(Role.MENTOR)) {
                List<Assignment> assignments = assignmentService.getByAuthor(user.getId());
                List<AssignmentResponseDTO> assignmentResponseDTOS = assignments
                        .stream().map(assignment -> getAssignmentMapper().toDTO(assignment)).collect(Collectors.toList());

                return ResponseEntity.ok().body(
                        PageResponseWrapperDTO.<List<AssignmentResponseDTO>>builder().value(assignmentResponseDTOS)
                                .build());
            } else if (user.getRole().equals(Role.STUDENT)) {
                List<Assignment> assignments = assignmentService.getAll();
                List<AssignmentResponseDTO> assignmentResponseDTOS = assignments.stream().filter(assignment -> assignment.getStudents().stream().map(User::getId).toList().contains(user.getId()))
                        .map(assignment -> getAssignmentMapper().toDTO(assignment)).collect(Collectors.toList());

                return ResponseEntity.ok().body(
                        PageResponseWrapperDTO.<List<AssignmentResponseDTO>>builder().value(assignmentResponseDTOS)
                                .build());
            }
        }

        return ResponseEntity.badRequest().body(PageResponseWrapperDTO
                .<List<AssignmentResponseDTO>>builder()
                .errorMessage("bad authentication type")
                .build());
    }

    @RequestMapping(value = "/title/{title}", method = RequestMethod.GET)
    public ResponseEntity<List<AssignmentResponseDTO>> getAssignments(@PathVariable String title) {
        List<Assignment> assignments = assignmentService.getByTitle(title);
        List<AssignmentResponseDTO> assignmentResponseDTOS = assignments.stream()
                .map(assignment -> getAssignmentMapper().toDTO(assignment)).collect(Collectors.toList());

        return ResponseEntity.ok().body(assignmentResponseDTOS);
    }

    @PostMapping()
    public ResponseEntity<AssignmentResponseDTO> addAnnouncement(@RequestBody AssignmentRequestDTO assignment) {
        URI uri = URI.create((ServletUriComponentsBuilder.fromCurrentContextPath().path("/addAssignment").toUriString()));

        return ResponseEntity.created(uri).body(getAssignmentMapper().toDTO(getAssignmentService().saveAssignment(assignment)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssignmentResponseDTO> updateAssignment(@RequestBody AssignmentRequestDTO assignment,
                                                                  @PathVariable Long id) {
        return ResponseEntity.ok().body(getAssignmentMapper().toDTO(getAssignmentService().
                updateAssignment(assignment, id)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deleteAssignment(@PathVariable Long id) {
        final Assignment assignment = getAssignmentService().findById(id).
                orElseThrow(EntityNotFoundException::new);

        assignmentService.deleteAssignmentById(assignment.getId());

        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
