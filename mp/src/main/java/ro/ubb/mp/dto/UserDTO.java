package ro.ubb.mp.dto;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;

@Data @Builder
public class UserDTO {
    private String fullName;
    private String email;
    private String password;
    private String profilePic;
    private ArrayList<String> interestAreas;
    private Boolean isMentor;
}
