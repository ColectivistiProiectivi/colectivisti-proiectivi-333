package ro.ubb.mp.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ro.ubb.mp.controller.dto.UserRequestDTO;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.service.user.UserService;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Getter
public class UserController {
    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getAll());
    }

    @GetMapping("/mentor")
    public String viewMentorPage() {
        return "Mentor Page";
    }

    @GetMapping("/student")
    public String viewStudentPage() {
        return "Student Page";
    }
}
