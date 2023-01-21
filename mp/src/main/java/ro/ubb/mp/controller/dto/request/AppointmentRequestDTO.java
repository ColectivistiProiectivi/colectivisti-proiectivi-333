package ro.ubb.mp.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
public class AppointmentRequestDTO {
    private Long studentId;
    private Long mentorId;
    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:[.ss][.SSS][.SS][.S]")
    private LocalDateTime date;
    private String locationDetails;
}
