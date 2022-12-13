package ro.ubb.mp.controller.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class NotificationResponseDTO {
    private String message;
    private Date createdAt;
    private boolean isRead;
}
