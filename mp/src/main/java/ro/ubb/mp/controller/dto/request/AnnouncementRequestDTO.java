package ro.ubb.mp.controller.dto.request;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
@Builder
public class AnnouncementRequestDTO {

    private Long interestAreasId;
    private Long userId;
    private String title;
    private BigDecimal price;
    private String description;
}

