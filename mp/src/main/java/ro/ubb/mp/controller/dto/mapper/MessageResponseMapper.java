package ro.ubb.mp.controller.dto.mapper;
import org.mapstruct.Mapper;
import ro.ubb.mp.controller.dto.response.MessageResponseDTO;
import ro.ubb.mp.dao.model.Message;

@Mapper(componentModel = "spring")
public interface MessageResponseMapper {
    MessageResponseDTO toDTO(Message message);
}
