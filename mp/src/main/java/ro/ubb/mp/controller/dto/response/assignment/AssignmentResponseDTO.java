package ro.ubb.mp.controller.dto.response.assignment;

import ro.ubb.mp.controller.dto.request.UserRequestDTO;

import java.util.Date;
import java.util.List;

public class AssignmentResponseDTO {
    private Long id;
    private List<UserRequestDTO> students;
    private UserRequestDTO author;
    private String title;
    private Date startDate;
    private Date deadline;
    private String description;
    private Double maximumGrade;
}
