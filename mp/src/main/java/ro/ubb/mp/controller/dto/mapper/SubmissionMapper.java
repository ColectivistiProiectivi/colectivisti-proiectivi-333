package ro.ubb.mp.controller.dto.mapper;

import org.mapstruct.Mapper;
import ro.ubb.mp.controller.dto.request.SubmissionRequestDTO;
import ro.ubb.mp.dao.model.Submission;

@Mapper(componentModel = "spring")
public interface SubmissionMapper {
    SubmissionRequestDTO toDTO(Submission submission);
}
