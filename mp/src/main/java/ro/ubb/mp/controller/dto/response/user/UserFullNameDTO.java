package ro.ubb.mp.controller.dto.response.user;

import lombok.Data;

/**
 * when making or viewing an appointment, full name is sufficient */
@Data
public class UserFullNameDTO {
    private Long id;
    private String fullName;
}
