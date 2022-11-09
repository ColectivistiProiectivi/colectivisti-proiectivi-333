package ro.ubb.mp.service.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ro.ubb.mp.controller.dto.UserRequestDTO;
import ro.ubb.mp.dao.model.User;
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
                .profilePicture(userDTO.getProfilePicture())
                .build();

        userToBeSaved.getInterestAreas().add(userDTO.getInterestAreas());
        return userRepository.save(userToBeSaved);
    }

    @Override
    public User updateUser(Long id, UserRequestDTO userDTO) {
        User userToUpdate = userRepository.findById(id).orElseThrow(
                () -> new IllegalStateException(String.format("User with id %s doesn't exist", id))
        );
        validateEmailExists(userDTO.getEmail());
        userToUpdate.setFullName(userDTO.getFullName());
        userToUpdate.setEmail(userDTO.getEmail());
        //Encode
        userToUpdate.setPassword(userDTO.getPassword());
        userToUpdate.getInterestAreas().add(userDTO.getInterestAreas());
        userToUpdate.setProfilePicture(userDTO.getProfilePicture());
        userToUpdate.setRole(userDTO.getRole());

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
