package ro.ubb.mp.service.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ro.ubb.mp.controller.dto.UserRequestDTO;
import ro.ubb.mp.dao.model.Role;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.dao.repository.RoleRepository;
import ro.ubb.mp.dao.repository.UserRepository;

import javax.transaction.Transactional;
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
        return userRepository.findById(id);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User saveUser(UserRequestDTO userDTO) {
        validateEmailExists(userDTO.getEmail());
        final User userToBeSaved = User.builder()
                .fullName(userDTO.getFullName())
                .email(userDTO.getEmail())
                //.password(encoder.encode(userDTO.getPassword()))
                .password(userDTO.getPassword())
                .profilePicture(userDTO.getProfilePic())
                .interestAreas(userDTO.getInterestAreas())
                .build();
        userToBeSaved.getRoles().add(userDTO.getRole());
        return userRepository.save(userToBeSaved);
    }

    @Override
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public void deleteRole(Role role) {
        roleRepository.deleteById(role.getId());
    }

    @Override
    public void addRoleToUser(String email, String roleName) {
        User user = userRepository.findByEmail((email));
        Role role = roleRepository.findByName(roleName);
        user.getRoles().add(role);

    }

    @Override
    public User updateUser(Long id, UserRequestDTO userDTO) {
        User userToUpdate = userRepository.findById(id).orElseThrow(
                () -> new IllegalStateException(String.format("User with id %s doesn't exist", id))
        );
        validateEmailExists(userDTO.getEmail());
        userToUpdate.setFullName(userDTO.getFullName());
        userToUpdate.setEmail(userDTO.getEmail());
        userToUpdate.setPassword(userDTO.getPassword());
        userToUpdate.setInterestAreas(userDTO.getInterestAreas());
        userToUpdate.setProfilePicture(userDTO.getProfilePic());
        userToUpdate.getRoles().add(userDTO.getRole());

        return userRepository.save(userToUpdate);
    }

    @Override
    public void deleteUserByEmail(String email) {
        boolean userExists = userRepository.existsById(userRepository.findByEmail(email).getId());
        if (userExists) {
            userRepository.deleteById(getUserByEmail(email).getId());
        } else {
            throw new IllegalStateException(String.format("User with email %s doesn't exist", email));
        }
    }

    @Override
    public void deleteUserById(Long id) {
        boolean userExists = userRepository.existsById(id);
        if (userExists) {
            userRepository.deleteById(id);
        } else {
            throw new IllegalStateException(String.format("User with id %s doesn't exist", id));
        }
    }

    void validateEmailExists(String email) {
        Optional<User> userOptional = Optional.ofNullable(userRepository.findByEmail(email));
        if (userOptional.isPresent()) {
            throw new IllegalStateException(String.format("Email address %s already exists", email));
        }
    }
}
