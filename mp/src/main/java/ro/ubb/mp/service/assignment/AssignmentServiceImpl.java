package ro.ubb.mp.service.assignment;

import lombok.Data;
import lombok.Getter;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import ro.ubb.mp.controller.dto.request.AssignmentRequestDTO;
import ro.ubb.mp.dao.model.Announcement;
import ro.ubb.mp.dao.model.Assignment;
import ro.ubb.mp.dao.model.InterestArea;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.dao.repository.AssignmentRepository;
import ro.ubb.mp.service.user.UserService;

import javax.persistence.EntityNotFoundException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Data
@Getter
@Service
public class AssignmentServiceImpl implements AssignmentService {
    private final AssignmentRepository assignmentRepository;
    private final UserService userService;

    @Override
    public Optional<Assignment> findById(Long id) {
        return assignmentRepository.findById(id);
    }

    @Override
    public List<Assignment> getAll() {
        return assignmentRepository.findAll();
    }

    @Override
    public List<Assignment> getByAuthor(Long authorId) {
        Optional<User> user = userService.getUserById(authorId);

        return user.map(assignmentRepository::findByAuthor).orElse(null);
    }

    @Override
    public Assignment saveAssignment(AssignmentRequestDTO assignmentRequestDTO) {
        final User user = getUserService().getUserById(assignmentRequestDTO.getAuthorId()).
                orElseThrow(EntityNotFoundException::new);

        final List<User> students = new ArrayList<>();

        for(Long studentId: assignmentRequestDTO.getStudentIds()) {
            students.add(getUserService().getUserById(studentId).
                    orElseThrow(EntityNotFoundException::new));
        }

        final Assignment assignmentToBeSaved = Assignment.builder()
                .description(assignmentRequestDTO.getDescription())
                .title(assignmentRequestDTO.getTitle())
                .startDate(Timestamp.valueOf(assignmentRequestDTO.getStartDate()))
                .deadline(Timestamp.valueOf(assignmentRequestDTO.getDeadline()))
                .author(user)
                .students(students)
                .maximumGrade(assignmentRequestDTO.getMaximumGrade())
                .build();

        return assignmentRepository.save(assignmentToBeSaved);
    }

    @Override
    public Assignment updateAssignment(AssignmentRequestDTO assignmentRequestDTO, Long id) {
        Assignment assignment = findById(id).orElseThrow(EntityNotFoundException::new);

        final List<User> students = new ArrayList<>();

        for(Long studentId: assignmentRequestDTO.getStudentIds()) {
            students.add(getUserService().getUserById(studentId).
                    orElseThrow(EntityNotFoundException::new));
        }

        assignment.setDescription(assignmentRequestDTO.getDescription());
        assignment.setTitle(assignmentRequestDTO.getTitle());
        assignment.setDescription(assignmentRequestDTO.getDescription());
        assignment.setMaximumGrade(assignmentRequestDTO.getMaximumGrade());
        assignment.setDeadline(Timestamp.valueOf(assignmentRequestDTO.getDeadline()));
        assignment.setStartDate(Timestamp.valueOf(assignmentRequestDTO.getStartDate()));
        assignment.setStudents(students);

        return assignmentRepository.save(assignment);
    }

    @Override
    public void deleteAssignmentById(Long id) {
        assignmentRepository.deleteById(id);
    }
}
