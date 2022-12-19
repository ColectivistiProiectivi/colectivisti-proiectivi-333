package ro.ubb.mp.controller.dto.mapper;

import org.mapstruct.Mapper;
import ro.ubb.mp.controller.dto.response.assignment.AssignmentResponseDTO;
import ro.ubb.mp.dao.model.Assignment;

@Mapper(componentModel = "spring")
public interface AssignmentMapper {
    AssignmentResponseDTO toDTO(Assignment assignment);
}
