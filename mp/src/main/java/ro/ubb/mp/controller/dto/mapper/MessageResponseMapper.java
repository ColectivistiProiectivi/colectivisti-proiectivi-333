package ro.ubb.mp.controller.dto.mapper;
import ro.ubb.mp.controller.dto.response.MessageResponseDTO;
import ro.ubb.mp.dao.model.Message;

public interface MessageResponseMapper {
    MessageResponseDTO toDTO(Message message);
}
