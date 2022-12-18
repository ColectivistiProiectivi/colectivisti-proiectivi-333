package ro.ubb.mp.controller.dto.response.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Builder
@Data
public class UserProfileDTO {

    private Long id;
    private String fullName;
    private String email;
    private List<StudyResponseDTO> completedStudies;
    private StudyResponseDTO ongoingStudy;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate birthdate;
    private List<InterestAreaResponseDTO> interestAreas;
    private String description;
    private String role;


}
