package ro.ubb.mp.service.user;

import ro.ubb.mp.controller.dto.UserRequestDTO;
import ro.ubb.mp.dao.model.Role;
import ro.ubb.mp.dao.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAll();

    Optional<User> getUserById(Long id);

    User getUserByEmail(String email);

    User saveUser(UserRequestDTO userDTO);

    Role saveRole(Role role);

    void deleteRole(Role role);

    void addRoleToUser(String email, String role);

    User updateUser(Long id, UserRequestDTO userDTO);

    void deleteUserByEmail(String email);

    void deleteUserById(Long id);
}
