package ro.ubb.mp.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import ro.ubb.mp.controller.dto.response.user.UserFullNameDTO;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
public class AppointmentResponseDTO {
    private Long id;
    private UserFullNameDTO student;
    private UserFullNameDTO mentor;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:[.ss][.SSS][.SS][.S]")
    private LocalDateTime date;
    private String locationDetails;
}
