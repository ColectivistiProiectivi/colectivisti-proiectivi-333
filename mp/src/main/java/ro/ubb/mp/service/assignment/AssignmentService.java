package ro.ubb.mp.service.assignment;

import ro.ubb.mp.controller.dto.request.AssignmentRequestDTO;
import ro.ubb.mp.dao.model.Assignment;
import ro.ubb.mp.dao.model.Submission;

import java.util.List;
import java.util.Optional;

public interface AssignmentService {
    Optional<Assignment> findById(Long id);

    List<Assignment> getAll();
    List<Assignment> getByAuthor(Long authorId);
    List<Assignment> getByTitle(String title);

    Assignment saveAssignment(AssignmentRequestDTO assignmentRequestDTO);
    Assignment updateAssignment(AssignmentRequestDTO assignmentRequestDTO, Long id);

    Optional<Submission> getSubmissionById(Long submissionId);

    void deleteAssignmentById(Long id);
}
