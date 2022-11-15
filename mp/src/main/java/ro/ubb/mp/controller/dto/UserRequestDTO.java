package ro.ubb.mp.controller.dto;

import lombok.Builder;
import lombok.Data;
import ro.ubb.mp.dao.model.Role;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
public class UserRequestDTO {
    private String fullName;
    private String username;
    private String email;
    private String password;
    private String profilePicture;
    private Set<String> interestAreas = new HashSet<String>();
    private Role role;
}
