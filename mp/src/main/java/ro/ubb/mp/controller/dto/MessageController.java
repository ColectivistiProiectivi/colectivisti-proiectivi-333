package ro.ubb.mp.controller.dto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ro.ubb.mp.controller.dto.mapper.MessageResponseMapper;
import ro.ubb.mp.controller.dto.request.MessageRequestDTO;
import ro.ubb.mp.dao.model.Message;
import ro.ubb.mp.service.message.MessageService;

import javax.persistence.EntityNotFoundException;
import java.net.URI;


@RestController
@RequestMapping("/messages")
@Getter
@RequiredArgsConstructor
public class MessageController {
    @Autowired
    MessageService service;
    final MessageResponseMapper responseMapper;



    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deleteMessage(@PathVariable int id) {

        final Message message = getService().findById(id).
                orElseThrow(EntityNotFoundException::new);
        service.deleteMessageById(message.getId());
        return new ResponseEntity<>(id, HttpStatus.OK);


    }
    @PostMapping()
    public ResponseEntity<Message> addMessage(@RequestBody MessageRequestDTO message) {
        URI uri = URI.create((ServletUriComponentsBuilder.fromCurrentContextPath().path("/addMessage").toUriString()));

        return ResponseEntity.created(uri).body(getService().saveMessage(message));
    }




}
