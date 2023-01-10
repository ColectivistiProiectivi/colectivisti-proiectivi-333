package ro.ubb.mp.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.ubb.mp.dao.model.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
