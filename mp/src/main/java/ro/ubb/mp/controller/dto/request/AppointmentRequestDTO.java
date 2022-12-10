package ro.ubb.mp.controller.dto.request;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@Builder
public class AppointmentRequestDTO {
    private String id;
    private String studentId;
    private String mentorId;
    @NotNull
    private LocalDateTime date;
    private String details;
}
