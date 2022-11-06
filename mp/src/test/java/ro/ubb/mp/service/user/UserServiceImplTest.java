package ro.ubb.mp.service.user;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.dao.repository.UserRepository;

import static org.junit.jupiter.api.Assertions.*;

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
                .email("a@test1.com")
                .password("password")
                .build();

        User u2 = User.builder()
                .fullName("B")
                .email("b@test2.com")
                .password("password")
                .build();
        userRepository.save(u1);
        userRepository.save(u2);
        userService.deleteUserById(u1.getId());
        userService.deleteUserById(u2.getId());
    }
}