package ro.ubb.mp.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.context.request.WebRequest;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.dao.repository.UserRepository;
import ro.ubb.mp.dto.UserDTO;
import ro.ubb.mp.service.user.UserService;

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
}
