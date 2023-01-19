package ro.ubb.mp.controller.dto.request;

import lombok.Data;

@Data
public class SubmissionRequestDTO {
    private Long studentId;
    private String homeworkURL;
    private double grade;
    private String feedback;
}
