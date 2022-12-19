package ro.ubb.mp.controller;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ro.ubb.mp.controller.dto.mapper.AssignmentMapper;
import ro.ubb.mp.controller.dto.request.AssignmentRequestDTO;
import ro.ubb.mp.controller.dto.response.assignment.AssignmentResponseDTO;
import ro.ubb.mp.dao.model.Assignment;
import ro.ubb.mp.service.assignment.AssignmentService;
import ro.ubb.mp.service.user.UserService;

import java.net.URI;

@RestController
@RequestMapping("/assignments")
@Getter
@RequiredArgsConstructor
public class AssignmentController {
    private final AssignmentService assignmentService;
    private final UserService userService;
    private final AssignmentMapper assignmentMapper;

    @PostMapping()
    public ResponseEntity<String> addAnnouncement(@RequestBody AssignmentRequestDTO assignment) {
        URI uri = URI.create((ServletUriComponentsBuilder.fromCurrentContextPath().path("/addAssignment").toUriString()));

        getAssignmentService().saveAssignment(assignment);

        return ResponseEntity.created(uri).body("success");
    }
}
