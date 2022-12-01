package ro.ubb.mp.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.ubb.mp.controller.dto.response.ResponseWrapperDTO;
import ro.ubb.mp.controller.dto.response.UserProfileDTO;
import ro.ubb.mp.dao.model.InterestArea;
import ro.ubb.mp.dao.model.Study;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.service.user.UserService;

import java.net.Authenticator;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Getter
public class UserController {
    private final UserService userService;

    /**
     *
     * This endpoint will let only users that have the MENTOR authority(ROLE) to access it.
     * In case the MENTOR authority is missing the 403 code is being returned
     * (403 Forbidden => Means we are lacking the necessary authorities(ROLES) to access the given resource
     */
    @GetMapping("/users")
    @PreAuthorize("hasAnyAuthority('MENTOR')")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getAll());
    }

    @GetMapping("/mentors")
    public ResponseEntity<List<User>> getMentors() {
        return ResponseEntity.ok().body(userService.getAllMentors());
    }

    @GetMapping("/users/profile")
    public ResponseEntity<ResponseWrapperDTO<UserProfileDTO>> getProfileInfo (final Authentication authentication) {

        if(authentication.getPrincipal() instanceof User user) {

            final User fetchedUser = (User)userService.loadUserByUsername(user.getUsername());

            final UserProfileDTO userProfileDTO = UserProfileDTO
                    .builder()
                    .id(fetchedUser.getId())
                    .email(fetchedUser.getUsername())
                    .profilePicture(fetchedUser.getProfilePicture())
                    .birthdate(fetchedUser.getBirthdate())
                    .completedStudies(fetchedUser.getCompletedStudies() != null ? fetchedUser.getCompletedStudies().stream().map(Study::getName).collect(Collectors.toList()) : null)
                    .ongoingStudy(fetchedUser.getOngoingStudy() != null ? fetchedUser.getOngoingStudy().getName() : null)
                    .interestAreas(fetchedUser.getInterestAreas() != null ? fetchedUser.getInterestAreas().stream().map(InterestArea::getName).collect(Collectors.toList()) : null)
                    .description(fetchedUser.getDescription())
                    .fullName(fetchedUser.getFullName())
                    .role(fetchedUser.getRole().toString())
                    .build();
            return ResponseEntity
                    .ok(ResponseWrapperDTO
                            .<UserProfileDTO>builder()
                            .value(userProfileDTO)
                            .build()
                    );
        }

        return ResponseEntity
                .badRequest()
                .body(ResponseWrapperDTO
                        .<UserProfileDTO>builder()
                        .errorMessage("Wrong authentication type")
                        .build()
                );
    }
}
