package ro.ubb.mp.service.user;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import ro.ubb.mp.controller.dto.UserRequestDTO;
import ro.ubb.mp.dao.model.Role;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.dao.repository.UserRepository;

import java.util.Collections;
import java.util.List;
import java.util.Set;

@SpringBootTest
class UserServiceImplTest {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @Test
    public void saveAndDeleteUser() {
        User u1 = User.builder()
                .fullName("A")
                .email("a@adddelete1.com")
                .password("password")
                .role(Role.MENTOR)
                .build();

        User u2 = User.builder()
                .fullName("B")
                .email("b@testadddelete1.com")
                .password("password")
                .role(Role.STUDENT)
                .build();
        userRepository.save(u1);
        userRepository.save(u2);

        userService.deleteUserById(u1.getId());
        userService.deleteUserById(u2.getId());
    }

    @Test
    public void updateUser() {
        User u1 = User.builder()
                .fullName("A")
                .email("a@testupdate1.com")
                .password("password")
                .role(Role.STUDENT)
                .interestAreas(Set.of("mate", "computer"))
                .build();

        userRepository.save(u1);

        UserRequestDTO userDTO = UserRequestDTO.builder()
                .fullName("aUpdate")
                .email("a@testupdatedto1.com")
                .password("password")
                .role(Role.STUDENT)
                .build();

        userService.updateUser(u1.getId(), userDTO);

        userService.deleteUserById(u1.getId());
    }
}