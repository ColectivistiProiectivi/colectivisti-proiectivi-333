package ro.ubb.mp.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;


import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@Builder
public class AssignmentRequestDTO {
    private List<Long> studentIds;
    private Long authorId;
    private String title;

    @JsonFormat(
            shape = JsonFormat.Shape.STRING,
            pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime startDate;

    @JsonFormat(
            shape = JsonFormat.Shape.STRING,
            pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime deadline;

    private String description;
    private Double maximumGrade;
}
