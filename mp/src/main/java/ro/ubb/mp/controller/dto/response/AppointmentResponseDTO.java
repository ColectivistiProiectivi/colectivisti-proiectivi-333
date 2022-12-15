package ro.ubb.mp.controller.dto.response;

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
    private UserFullNameDTO fullName;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime date;
    private String locationDetails;
}
