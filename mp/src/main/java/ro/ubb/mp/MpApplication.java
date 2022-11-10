package ro.ubb.mp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import ro.ubb.mp.dao.model.Role;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.dao.repository.UserRepository;
import java.util.Set;

@SpringBootApplication
public class MpApplication {
    public static void main(String[] args) {
        SpringApplication.run(MpApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository){
        return args -> {
            User u1 = User.builder()
                    .fullName("A")
                    .email("Giulia@example1.com")
                    .password("password")
                    .role(Role.MENTOR)
                    .interestAreas(Set.of("mate", "info"))
                    .build();

            User u2 = User.builder()
                    .fullName("B")
                    .email("Carmen@example2.com")
                    .password("password")
                    .role(Role.STUDENT)
                    .interestAreas(Set.of("history", "archeology"))
                    .build();

            User u3 = User.builder()
                    .fullName("B")
                    .email("Antonia@example2.com")
                    .password("password")
                    .role(Role.STUDENT)
                    .interestAreas(Set.of("Java", "React"))
                    .build();
            userRepository.save(u1);
            userRepository.save(u2);
            userRepository.save(u3);
        };
    }
}