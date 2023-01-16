package ro.ubb.mp.service.message;

import ro.ubb.mp.controller.dto.request.MessageRequestDTO;
import ro.ubb.mp.dao.model.Message;

import java.util.List;
import java.util.Optional;

public interface MessageService {
    public Optional<Message> findById(Long id);
    public Message saveMessage(MessageRequestDTO messageDTO);
    public void deleteMessageById(Long id);
    public List<Message> getMessagesBetweenUsers(Long id1, Long id2);
    public List<Message> getAllUserMessages(Long id);
}
