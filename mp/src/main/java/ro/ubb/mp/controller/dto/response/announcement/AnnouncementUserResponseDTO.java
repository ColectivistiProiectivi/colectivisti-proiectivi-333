package ro.ubb.mp.controller.dto.response.announcement;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AnnouncementUserResponseDTO {
    private Long id;
    private String fullName;
    private String profilePicture;
}
