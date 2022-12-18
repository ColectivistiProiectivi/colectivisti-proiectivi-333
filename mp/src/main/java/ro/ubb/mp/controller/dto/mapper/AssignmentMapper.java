package ro.ubb.mp.controller.dto.mapper;

import org.mapstruct.Mapper;
import ro.ubb.mp.dao.model.Assignment;

@Mapper
public interface AssignmentMapper {
    AssignmentResponseDTO toDTO(Assignment assignment);
}
