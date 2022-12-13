package ro.ubb.mp.service.message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.ubb.mp.dao.model.Message;
import ro.ubb.mp.dao.repository.MessageRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class MessageService {
    @Autowired
    MessageRepository messageRepository;

    public List<Message> getAll() {
        List<Message> messages = new ArrayList<Message>();
        messageRepository.findAll().forEach(message1 -> messages.add(message1));
        return messages;
    }

    public Message getMessageById(int id) {
        return messageRepository.findById(id).get();
    }

    public void saveOrUpdate(Message message) {
        messageRepository.save(message);
    }

    public void delete(int id) {
        messageRepository.deleteById(id);
    }


    public void update(Message message, int id) {
        messageRepository.save(message);
    }
}