package ro.ubb.mp.dao.repository;

import org.springframework.data.repository.CrudRepository;
import ro.ubb.mp.dao.model.Message;

public interface MessageRepository extends CrudRepository<Message, Integer> {
}
