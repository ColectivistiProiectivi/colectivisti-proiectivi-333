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
//@RequestMapping()
@RequiredArgsConstructor
@Getter
public class UserController {
    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getAll());
    }

    @PostMapping("/user/register")
    public ResponseEntity<User> register(@RequestBody UserRequestDTO user){
        URI uri =URI.create((ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/register").toUriString()));
        return ResponseEntity.created(uri).body(userService.saveUser(user));
    }
}
