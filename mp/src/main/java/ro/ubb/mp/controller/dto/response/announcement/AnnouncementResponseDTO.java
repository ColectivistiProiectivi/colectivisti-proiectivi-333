package ro.ubb.mp.controller.dto.response.announcement;

import lombok.Builder;
import lombok.Data;
import ro.ubb.mp.controller.dto.response.InterestAreaResponseDTO;

import java.math.BigDecimal;
import java.util.Date;

@Data
@Builder
public class AnnouncementResponseDTO {
    private Long id;
    private InterestAreaResponseDTO interestAreas;
    private AnnouncementUserResponseDTO user;
    private String title;
    private BigDecimal price;
    private Date postingDate;
    private String description;
}
