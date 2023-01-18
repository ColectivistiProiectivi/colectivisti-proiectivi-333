package ro.ubb.mp.controller.dto.response.assignment;

import lombok.Builder;
import lombok.Data;
import ro.ubb.mp.controller.dto.request.UserRequestDTO;

import java.util.Date;
import java.util.List;

@Data
@Builder
public class AssignmentResponseDTO {
    private Long id;
    private List<UserRequestDTO> students;
    private UserRequestDTO author;
    private List<UserRequestDTO> submissionStudentIds;
    private String title;
    private Date startDate;
    private Date deadline;
    private String description;
    private Double maximumGrade;
}
