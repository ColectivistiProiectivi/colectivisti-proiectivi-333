package ro.ubb.mp.controller.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InterestAreaResponseDTO {
    private Long id;
    private String name;
}