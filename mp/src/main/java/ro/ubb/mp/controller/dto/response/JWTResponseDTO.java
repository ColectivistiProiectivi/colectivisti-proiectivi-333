package ro.ubb.mp.controller.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Builder
@Data
public class JWTResponseDTO {
    private String value;
    private String email;
    private Set<String> authorities;
}
