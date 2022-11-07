package ro.ubb.mp.dao.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import ro.ubb.mp.dao.model.Role;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RoleRepositoryTest {
    @Autowired
    private RoleRepository roleRepository;

    @Test
    public void saveAndDeleteRole() {
        Role r1 = Role.builder()
                .name("student")
                .build();
        roleRepository.save(r1);

        Role r2 = Role.builder()
                .name("mentor")
                .build();
        roleRepository.save(r1);
        Role r3 = Role.builder()
                .name("both")
                .build();
        roleRepository.save(r1);
        roleRepository.save(r2);
        roleRepository.save(r3);
        roleRepository.delete(r1);
        roleRepository.delete(r2);
        roleRepository.delete(r3);
    }

}