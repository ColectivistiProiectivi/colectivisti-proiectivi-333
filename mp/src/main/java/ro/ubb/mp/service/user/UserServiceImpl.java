package ro.ubb.mp.service.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ro.ubb.mp.controller.dto.UserRequestDTO;
import ro.ubb.mp.dao.model.Role;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.dao.repository.RoleRepository;
import ro.ubb.mp.dao.repository.UserRepository;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service("userService")
@RequiredArgsConstructor
@Transactional
@Slf4j

public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
//    private final BCryptPasswordEncoder encoder;

    @Override
    public List<User> getAll() {
        log.info("fetching all users");

        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(Long id) {
        //log.info("fetching user {}", userRepository.findById(id).get().getFullName());

        return userRepository.findById(id);
    }

    @Override
    public User getUserByEmail(String email) {
        //log.info("fetching user {}", userRepository.findByEmail(email).getFullName());

        return userRepository.findByEmail(email);
    }

    @Override
    public User saveUser(UserRequestDTO userDTO) {
        final User userToBeSaved = User.builder()
                .fullName(userDTO.getFullName())
                .email(userDTO.getEmail())
                //.password(encoder.encode(userDTO.getPassword()))
                .password(userDTO.getPassword())
                .profilePicture(userDTO.getProfilePic())
                .interestAreas(userDTO.getInterestAreas())
                .build();
        userToBeSaved.getRoles().add(userDTO.getRole());
        //log.info("saving new user {} to the database", userToBeSaved.getFullName());
        return userRepository.save(userToBeSaved);
    }

    @Override
    public Role saveRole(Role role) {
        //log.info("saving new role {} to the database", role.getName());

        return roleRepository.save(role);
    }

    @Override
    public void addRoleToUser(String email, String roleName) {
        //log.info("adding role {} to user {}", roleName, userRepository.findByEmail(email).getFullName());

        User user = userRepository.findByEmail((email));
        Role role = roleRepository.findByName(roleName);
        user.getRoles().add(role);

    }

    @Override
    public void deleteUserByEmail(String email) {
        userRepository.deleteById(getUserByEmail(email).getId());
    }
    @Override
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }
}
