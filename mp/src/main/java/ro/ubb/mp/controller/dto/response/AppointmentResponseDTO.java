package ro.ubb.mp.controller.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AppointmentResponseDTO {
    private Long id;
    private Long studentId;
    private Long mentorId;
    private LocalDateTime date;
    private String locationDetails;
}
