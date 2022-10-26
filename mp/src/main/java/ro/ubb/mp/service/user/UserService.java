package ro.ubb.mp.service.user;

import ro.ubb.mp.dao.model.User;

import java.util.List;

public interface UserService {
    List<User> getAll();
}
