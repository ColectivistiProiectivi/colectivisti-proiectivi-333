package ro.ubb.mp.controller.dto.mapper;
        import org.mapstruct.Mapper;
        import ro.ubb.mp.controller.dto.response.NotificationResponseDTO;
        import ro.ubb.mp.dao.model.Notification;

@Mapper(componentModel = "spring")

public interface NotificationResponseMapper {
    NotificationResponseDTO toDTO(Notification notification);
}