package ro.ubb.mp.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    /**
     *
     * This endpoint will let only users that have the MENTOR authority(ROLE) to access it.
     * In case the MENTOR authority is missing the 403 code is being returned
     * (403 Forbidden => Means we are lacking the necessary authorities(ROLES) to access the given resource
     */
    @GetMapping("/users")
    @PreAuthorize("hasAnyAuthority('MENTOR')")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getAll());
    }

    @GetMapping("/mentors")
    public ResponseEntity<List<User>> getMentors() {
        return ResponseEntity.ok().body(userService.getAllMentors());
    }
}
