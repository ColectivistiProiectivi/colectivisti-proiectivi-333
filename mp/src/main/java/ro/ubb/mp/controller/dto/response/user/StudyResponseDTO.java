package ro.ubb.mp.controller.dto.response.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudyResponseDTO {

    private Long id;
    private String name;
}
