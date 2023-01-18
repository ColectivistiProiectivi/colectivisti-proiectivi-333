package ro.ubb.mp.service.message;

import lombok.Data;
import lombok.Getter;
import org.springframework.stereotype.Service;
import ro.ubb.mp.controller.dto.request.MessageRequestDTO;
import ro.ubb.mp.dao.model.Message;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.dao.repository.MessageRepository;
import ro.ubb.mp.service.user.UserService;

import javax.persistence.EntityNotFoundException;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Data
@Getter
@Service("messageService")
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final UserService userService;

    @Override
    public Optional<Message> findById(Long id) {
        return messageRepository.findById(id);
    }

    @Override
    public Message saveMessage(MessageRequestDTO messageDTO) {
        final User sender = getUserService().getUserById(messageDTO.getSenderId()).orElseThrow(EntityNotFoundException::new);
        final User receiver = getUserService().getUserById(messageDTO.getReceiverId()).orElseThrow(EntityNotFoundException::new);

        final Message messageToBeSaved = Message.builder()
                .content(messageDTO.getContent())
                .receiver(receiver)
                .time(Timestamp.from(Instant.now()))
                .sender(sender)
                .build();

        return messageRepository.save(messageToBeSaved);
    }

    @Override
    public void deleteMessageById(Long id) {
        messageRepository.deleteById(id);
    }

    @Override
    public List<Message> getMessagesBetweenUsers(Long id1, Long id2) {
        User user1 = userService.getUserById(id1).orElseThrow(EntityNotFoundException::new);
        User user2 = userService.getUserById(id2).orElseThrow(EntityNotFoundException::new);

        return Stream.concat(messageRepository.findBySenderAndReceiver(user1, user2).stream(),
                        messageRepository.findBySenderAndReceiver(user2, user1).stream())
                .sorted(Comparator.comparing(Message::getTime)).collect(Collectors.toList());
    }

    @Override
    public List<Message> getAllUserMessages(Long id) {
        User user = userService.getUserById(id).orElseThrow(EntityNotFoundException::new);

        return Stream.concat(messageRepository.findBySender(user).stream(),
                        messageRepository.findByReceiver(user).stream())
                .sorted(Comparator.comparing(Message::getTime)).collect(Collectors.toList());
    }
}

