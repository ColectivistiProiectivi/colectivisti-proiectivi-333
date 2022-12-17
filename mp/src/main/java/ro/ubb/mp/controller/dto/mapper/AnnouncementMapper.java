package ro.ubb.mp.controller.dto.mapper;

import org.mapstruct.Mapper;
import ro.ubb.mp.controller.dto.response.announcement.AnnouncementResponseDTO;
import ro.ubb.mp.dao.model.Announcement;

@Mapper(componentModel = "spring")
public interface AnnouncementMapper {
    AnnouncementResponseDTO toDTO(Announcement announcement);
}
