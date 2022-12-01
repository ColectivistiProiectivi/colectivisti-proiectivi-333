package ro.ubb.mp.controller.dto.response;

import lombok.Builder;
import lombok.Data;

import java.sql.Date;
import java.util.List;

@Builder
@Data
public class UserProfileDTO {

    private Long id;
    private String fullName;
    private String email;
    private String profilePicture;
    private List<String> completedStudies;
    private String ongoingStudy;
    private Date birthdate;
    private List<String> interestAreas;
    private String description;
    private String role;


}
