package ro.ubb.mp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ro.ubb.mp.controller.dto.UserRequestDTO;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.dto.UserDTO;
import ro.ubb.mp.service.user.UserService;

import java.net.URI;

public class AuthController {

    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody UserRequestDTO user){
        URI uri =URI.create((ServletUriComponentsBuilder.fromCurrentContextPath().path("/register").toUriString()));
        return ResponseEntity.created(uri).body(userService.saveUser(user));
    }
}
