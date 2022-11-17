package ro.ubb.mp.controller.dto;

import lombok.Builder;
import lombok.Data;
import ro.ubb.mp.dao.model.Role;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Data
@Builder
public class UserRequestDTO {
    @NotBlank
    private String fullName;
    private String username;
    private String password;
    private String profilePicture;
    private Set<String> interestAreas;
    private Role role;
}
