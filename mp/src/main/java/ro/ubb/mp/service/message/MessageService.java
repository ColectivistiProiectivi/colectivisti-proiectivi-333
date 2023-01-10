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
import ro.ubb.mp.service.user.UserService;

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
    final UserService userService;


    public Optional<Message> findById(Long id) {
        return messageRepository.findById(id);
    }



    public Message saveMessage(MessageRequestDTO messageDTO) {
        final User sender = getUserService().getUserById(messageDTO.getSenderId()).orElseThrow(EntityNotFoundException::new);
        final User receiver = getUserService().getUserById(messageDTO.getReceiverId()).orElseThrow(EntityNotFoundException::new);

        final Message messageToBeSaved = Message.builder()
                .content(messageDTO.getContent())
                .receiver(receiver)
                .sender(sender)
                .time(messageDTO.getTime())
                .build();

       return messageRepository.save(messageToBeSaved);
    }

    public void deleteMessageById(Long id) {
        messageRepository.deleteById(id);
    }
}

