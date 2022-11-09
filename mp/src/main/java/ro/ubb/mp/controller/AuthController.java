package ro.ubb.mp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.dao.repository.UserRepository;
import ro.ubb.mp.dto.UserDTO;
import ro.ubb.mp.service.user.UserService;

import java.net.URI;

public class AuthController {
    private UserService userService;
    @GetMapping("/register")
    public String showRegistrationForm(WebRequest request, Model model) {
        UserDTO userDto = new UserDTO();
        model.addAttribute("user", userDto);

        return "registration";
    }

    @PostMapping("/process_register")
    public String processRegister(UserDTO userDTO) {
//        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//        String encodedPassword = passwordEncoder.encode(user.getPassword());
//        user.setPassword(encodedPassword);
        userDTO.setPassword(userDTO.getPassword());

        userService.saveUser(userDTO);

        return "register_success";
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody UserDTO user){
        URI uri =URI.create((ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/register").toUriString()));
        return ResponseEntity.created(uri).body(userService.saveUser(user));
    }
}
