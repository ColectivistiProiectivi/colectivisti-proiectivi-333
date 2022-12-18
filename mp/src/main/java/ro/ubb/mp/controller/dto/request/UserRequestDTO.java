package ro.ubb.mp.controller.dto.request;

import lombok.Builder;
import lombok.Data;
import ro.ubb.mp.dao.model.Role;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
@Builder
public class UserRequestDTO {
    @NotBlank
    private String fullName;
    @NotBlank
    private String username;
    @NotBlank
    @Size(min = 7)
    private String password;
    private String profilePicture;
    private Set<Long> interestAreaIds;
    @NotNull
    private Role role;
}
