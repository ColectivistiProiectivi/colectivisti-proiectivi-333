package ro.ubb.mp.controller.dto.mapper;

import org.mapstruct.Mapper;
import ro.ubb.mp.controller.dto.response.user.StudyResponseDTO;
import ro.ubb.mp.dao.model.Study;

@Mapper(componentModel = "spring")
public interface StudyMapper {

    StudyResponseDTO toDto(Study study);
}
