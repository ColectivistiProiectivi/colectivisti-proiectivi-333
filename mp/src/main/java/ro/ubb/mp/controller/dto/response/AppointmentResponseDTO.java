package ro.ubb.mp.controller.dto.response;

import lombok.Builder;
import lombok.Data;
import ro.ubb.mp.controller.dto.response.user.UserFullNameDTO;

import java.time.LocalDateTime;

@Data
@Builder
public class AppointmentResponseDTO {
    private Long id;
    private UserFullNameDTO fullName;
    private LocalDateTime date;
    private String locationDetails;
}
