package ro.ubb.mp.controller.dto;

import lombok.Builder;
import lombok.Data;
import ro.ubb.mp.dao.model.Role;

@Data
@Builder
public class UserRequestDTO {
    private String fullName;
    private String email;
    private String password;
    private String profilePic;
    private String interestAreas;
    private Role role;

}
