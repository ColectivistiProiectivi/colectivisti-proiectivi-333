package ro.ubb.mp.service.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.ubb.mp.controller.dto.request.UserRequestDTO;
import ro.ubb.mp.dao.model.Role;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.dao.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service("userService")
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User saveUser(UserRequestDTO userDTO) {

        validateEmailExists(userDTO.getUsername());

        final User userToBeSaved = User.builder()
                .fullName(userDTO.getFullName())
                .password(userDTO.getPassword())
                .role(userDTO.getRole())
                .profilePicture(userDTO.getProfilePicture())
                .build();

        userToBeSaved.setUsername(userDTO.getUsername());
        userToBeSaved.setPassword(passwordEncoder.encode((userDTO.getPassword())));

        return userRepository.save(userToBeSaved);
    }

    @Override
    public User updateUser(Long id, UserRequestDTO userDTO) {
        User userToUpdate = userRepository.findById(id).orElseThrow(
                () -> new IllegalStateException(String.format("User with id %s doesn't exist", id))
        );

        validateEmailExists(userDTO.getUsername());

        userToUpdate.setFullName(userDTO.getFullName());
        userToUpdate.setUsername(userDTO.getUsername());
        userToUpdate.setPassword(userDTO.getPassword());
        userToUpdate.setProfilePicture(userDTO.getProfilePicture());
        userToUpdate.setRole(userDTO.getRole());

        return userRepository.save(userToUpdate);
    }

    @Override
    public void deleteUserByEmail(String email) {

        final User user = userRepository.findByUsername(email)
                .orElseThrow(() -> new UsernameNotFoundException("The user with the given email does not exist" + email));
        userRepository.deleteById(user.getId());
    }

    @Override
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    void validateEmailExists(String email) {
        Optional<User> userOptional = userRepository.findByUsername(email);
        if (userOptional.isPresent()) {
            throw new IllegalStateException(String.format("Email address %s already exists", email));
        }
    }

    /**
     * creates a partial user based on the email (= username)
     * @param username is the email
     * @return the found user
     * @throws UsernameNotFoundException in case there is no user to be found
     */
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + username));
    }

    public List<User> getAllMentors() {
        return userRepository.findAllByRole(Role.MENTOR);
    }
}
