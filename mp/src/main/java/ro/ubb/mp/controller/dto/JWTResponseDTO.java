package ro.ubb.mp.controller.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class JWTResponseDTO {
    private String value;
}
