package ro.ubb.mp.controller.dto.response.user;

import lombok.Builder;
import lombok.Data;
import ro.ubb.mp.dao.model.Role;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Builder
public class AssignmentUserDTO {
    private Long id;
    @NotBlank
    private String fullName;
    @NotBlank
    private String email;
    @NotNull
    private Role role;
}
