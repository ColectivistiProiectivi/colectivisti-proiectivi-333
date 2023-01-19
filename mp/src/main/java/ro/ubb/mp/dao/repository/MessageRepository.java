package ro.ubb.mp.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.ubb.mp.dao.model.Message;
import ro.ubb.mp.dao.model.User;

import java.util.ArrayList;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderAndReceiver(User sender, User receiver);
    List<Message> findBySender(User user);
    List<Message> findByReceiver(User user);
}
