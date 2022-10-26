package ro.ubb.mp.service.user;

import lombok.Getter;
import org.springframework.stereotype.Service;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.dao.repository.UserRepository;

import java.util.List;

@Service("userService")
@Getter
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAll() {
        return getUserRepository().findAll();
    }
}
