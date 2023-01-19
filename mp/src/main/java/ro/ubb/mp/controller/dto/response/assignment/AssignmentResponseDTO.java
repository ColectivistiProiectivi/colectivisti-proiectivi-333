package ro.ubb.mp.controller.dto.response.assignment;

import lombok.Builder;
import lombok.Data;
import ro.ubb.mp.controller.dto.request.SubmissionRequestDTO;
import ro.ubb.mp.controller.dto.response.user.AssignmentUserDTO;

import java.util.Date;
import java.util.List;

@Data
@Builder
public class AssignmentResponseDTO {
    private Long id;
    private List<AssignmentUserDTO> students;
    private AssignmentUserDTO author;
    private List<SubmissionRequestDTO> submissions;
    private String title;
    private Date startDate;
    private Date deadline;
    private String description;
    private Double maximumGrade;
}
