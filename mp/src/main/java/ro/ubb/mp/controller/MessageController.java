package ro.ubb.mp.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ro.ubb.mp.controller.dto.mapper.MessageResponseMapper;
import ro.ubb.mp.controller.dto.request.MessageRequestDTO;
import ro.ubb.mp.controller.dto.response.MessageResponseDTO;
import ro.ubb.mp.controller.dto.response.ResponseWrapperDTO;
import ro.ubb.mp.dao.model.Message;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.service.message.MessageService;
import ro.ubb.mp.service.message.MessageServiceImpl;

import javax.persistence.EntityNotFoundException;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/messages")
@Getter
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;
    private final MessageResponseMapper responseMapper;

    @GetMapping("/{id}")
    public ResponseEntity<ResponseWrapperDTO<MessageResponseDTO>> getMessageById(@PathVariable Long id) {
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof User user) {
            Message message = getMessageService().findById(id).orElseThrow(EntityNotFoundException::new);
            MessageResponseDTO messageResponseDTO = responseMapper.toDTO(message);

            return ResponseEntity.ok()
                    .body(ResponseWrapperDTO.<MessageResponseDTO>builder().value(messageResponseDTO).build());
        }

        return ResponseEntity.badRequest()
                .body(ResponseWrapperDTO.<MessageResponseDTO>builder().errorMessage("Bad authentication type").build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deleteMessage(@PathVariable Long id) {
        final Message message = getMessageService().findById(id).
                orElseThrow(EntityNotFoundException::new);
        messageService.deleteMessageById(message.getId());

        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<ResponseWrapperDTO<MessageResponseDTO>> addMessage(@RequestBody MessageRequestDTO messageRequestDTO) {
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof User user) {
            URI uri = URI.create((ServletUriComponentsBuilder.fromCurrentContextPath().path("/messages").toUriString()));

            Message message = getMessageService().saveMessage(messageRequestDTO);
            MessageResponseDTO messageResponseDTO = responseMapper.toDTO(message);

            return ResponseEntity.created(uri)
                    .body(ResponseWrapperDTO.<MessageResponseDTO>builder().value(messageResponseDTO).build());
        }

        return ResponseEntity.badRequest()
                .body(ResponseWrapperDTO.<MessageResponseDTO>builder().errorMessage("Bad authentication type").build());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<ResponseWrapperDTO<List<MessageResponseDTO>>> getAllMessagesBetweenUsers(@PathVariable Long id){
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof User user){
            List<MessageResponseDTO> messageResponseDTOS = getMessageService().getMessagesBetweenUsers(user.getId(), id)
                    .stream().map(message -> getResponseMapper().toDTO(message)).collect(Collectors.toList());

            return ResponseEntity.ok()
                    .body(ResponseWrapperDTO.<List<MessageResponseDTO>>builder().value(messageResponseDTOS).build());
        }

        return ResponseEntity.badRequest()
                .body(ResponseWrapperDTO.<List<MessageResponseDTO>>builder().errorMessage("Bad authentication type").build());
    }

    @GetMapping("user/{id}")
    public ResponseEntity<ResponseWrapperDTO<List<MessageResponseDTO>>> getAllUserMessages(@PathVariable Long id){
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof User user){
            List<MessageResponseDTO> messageResponseDTOS = getMessageService().getAllUserMessages(id)
                    .stream().map(message -> getResponseMapper().toDTO(message)).collect(Collectors.toList());

            return ResponseEntity.ok()
                    .body(ResponseWrapperDTO.<List<MessageResponseDTO>>builder().value(messageResponseDTOS).build());
        }

        return ResponseEntity.badRequest()
                .body(ResponseWrapperDTO.<List<MessageResponseDTO>>builder().errorMessage("Bad authentication type").build());
    }

}
