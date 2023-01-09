package ro.ubb.mp.service.message;

import lombok.Data;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.ubb.mp.controller.dto.request.AnnouncementRequestDTO;
import ro.ubb.mp.controller.dto.request.MessageRequestDTO;
import ro.ubb.mp.dao.model.Announcement;
import ro.ubb.mp.dao.model.InterestArea;
import ro.ubb.mp.dao.model.Message;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.dao.repository.MessageRepository;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Data
@Getter
@Service
public class MessageService {
    @Autowired
    MessageRepository messageRepository;


    public Optional<Message> findById(int id) {
        return messageRepository.findById(id);
    }


    public List<Message> getAllMessages() {
        return (List<Message>) messageRepository.findAll();
    }

    public void saveMessage(MessageRequestDTO messageDTO) {
        final Message messageToBeSaved = Message.builder()
                .content(messageDTO.getContent())
                .reciever(messageDTO.getReciever())
                .sender(messageDTO.getSender())
                .time(messageDTO.getTime())
                .build();
        messageRepository.save(messageToBeSaved);
    }

    public void deleteMessageById(int id) {
        messageRepository.deleteById(id);
    }
}

