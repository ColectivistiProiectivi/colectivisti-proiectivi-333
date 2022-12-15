package ro.ubb.mp.controller.dto.request;

import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
public class AppointmentRequestDTO {
    private Long id;
    private Long studentId;
    private Long mentorId;
    //@NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime date;
    private String locationDetails;
}
