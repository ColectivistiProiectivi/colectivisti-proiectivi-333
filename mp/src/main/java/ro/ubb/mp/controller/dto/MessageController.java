package ro.ubb.mp.controller.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ro.ubb.mp.dao.model.Message;
import ro.ubb.mp.service.message.MessageService;

import java.util.List;
@RestController
@RequestMapping("/messages")
@Getter
@RequiredArgsConstructor
public class MessageController {

    //autowire the MessageService class
    @Autowired
    MessageService messageService;
    //creating a get mapping that retrieves all the messages from the database
    @GetMapping("/messages")
    private List<Message> getAllMessages()
    {
        return messageService.getAll();
    }
    //creating a get mapping that retrieves the detail of a specific message
    @GetMapping("/messages/{id}")
    private Message getMessages(@PathVariable("id") int id)
    {
        return messageService.getMessageById(id);
    }
    //creating a delete mapping that deletes a specified message
    @DeleteMapping("/messages/{id}")
    private void deleteMessage(@PathVariable("id") int id)
    {
        messageService.delete(id);
    }
    //creating post mapping that post the message detail in the database
    @PostMapping("/messages")
    private int saveMessage(@RequestBody Message message)
    {
        messageService.saveOrUpdate(message);
        return message.getId();
    }
    //creating put mapping that updates the message detail
    @PutMapping("/messages")
    private Message update(@RequestBody Message message)
    {
        messageService.saveOrUpdate(message);
        return message;
    }
}
