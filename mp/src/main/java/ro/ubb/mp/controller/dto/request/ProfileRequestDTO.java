package ro.ubb.mp.controller.dto.request;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Data
public class ProfileRequestDTO {

    private Long id;
    private String fullName;
    private String password;
    private MultipartFile profilePicture;
    private List<Long> completedStudyIds;
    private Long ongoingStudyId;
    private List<Long> interestAreaIds;
    private String description;
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private LocalDate birthdate;
}
