package ro.ubb.mp.controller.dto.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import ro.ubb.mp.controller.dto.response.assignment.AssignmentResponseDTO;
import ro.ubb.mp.dao.model.Assignment;

@Mapper(componentModel = "spring")
public interface AssignmentMapper {
    @Mapping(target = "author.email", source = "author.username")
    AssignmentResponseDTO toDTO(Assignment assignment);
}
