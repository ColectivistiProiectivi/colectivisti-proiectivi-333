package ro.ubb.mp.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ro.ubb.mp.controller.dto.mapper.UserProfileResponseMapper;
import ro.ubb.mp.controller.dto.request.ProfileRequestDTO;
import ro.ubb.mp.controller.dto.response.ResponseWrapperDTO;
import ro.ubb.mp.controller.dto.response.user.UserProfileDTO;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.service.file.FileService;
import ro.ubb.mp.service.user.UserService;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Getter
@Slf4j
public class UserController {
    private final UserService userService;
    private final UserProfileResponseMapper userMapper;
    private final FileService fileService;

    /**
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
    public ResponseEntity<ResponseWrapperDTO<UserProfileDTO>> getProfileInfo(final Authentication authentication) {

        if (authentication.getPrincipal() instanceof User user) {

            final User fetchedUser = (User) userService.loadUserByUsername(user.getUsername());

            final UserProfileDTO userProfileDTO = getUserMapper().toProfileDTO(fetchedUser);
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

    @PutMapping(
            path = "/users/profile",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ResponseWrapperDTO<UserProfileDTO>> updateProfile(final @ModelAttribute ProfileRequestDTO profileRequestDTO,
                                                                            final Authentication authentication) throws IOException {

        if (authentication.getPrincipal() instanceof User user) {

            profileRequestDTO.setId(user.getId());

            if (profileRequestDTO.getProfilePicture() != null) {
                final String fileName = profileRequestDTO.getId() + "_profilePicture.jpg";
                getFileService().saveImageToDisk(profileRequestDTO.getProfilePicture(), fileName);
            }

            final UserProfileDTO userProfileDTO = getUserMapper().toProfileDTO(getUserService().updateProfile(profileRequestDTO));
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

    @GetMapping("/users/profile/picture")
    public ResponseEntity<?> getProfileImage(final Authentication authentication) throws IOException {

        if (authentication.getPrincipal() instanceof User user) {

            final ByteArrayResource profilePicture = fileService.getFileFromDisk(user.getId() + "_profilePicture.jpg");
            return ResponseEntity.ok()
                    .contentLength(profilePicture.contentLength())
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(profilePicture);
        }

        return ResponseEntity
                .badRequest()
                .body(ResponseWrapperDTO
                        .<UserProfileDTO>builder()
                        .errorMessage("Wrong authentication type")
                        .build()
                );
    }

    @GetMapping("/users/{userId}/profile/picture")
    public ResponseEntity<?> getProfileImageByUser(@PathVariable final Long userId,
                                                   final Authentication authentication) throws IOException {

        if (authentication.getPrincipal() instanceof User) {

            final ByteArrayResource profilePicture = fileService.getFileFromDisk(userId + "_profilePicture.jpg");
            return ResponseEntity.ok()
                    .contentLength(profilePicture.contentLength())
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(profilePicture);
        }

        return ResponseEntity
                .badRequest()
                .body(ResponseWrapperDTO
                        .<UserProfileDTO>builder()
                        .errorMessage("Wrong authentication type")
                        .build()
                );
    }

    @PreAuthorize("hasAnyAuthority('MENTOR')")
    @GetMapping("/mentors/appointments/students")
    public ResponseEntity<ResponseWrapperDTO<List<UserProfileDTO>>> getAppointmentsUsersByMentor(final Authentication authentication) throws IOException {

        if (authentication.getPrincipal() instanceof User mentor) {

            List<User> appointmentsStudents = getUserService().findAllAnnouncementsUsersByMentor(mentor);

            return ResponseEntity
                    .ok(ResponseWrapperDTO
                            .<List<UserProfileDTO>>builder()
                            .value(appointmentsStudents.stream().map(student -> getUserMapper().toProfileDTO(student)).toList())
                            .build());

        }

        return ResponseEntity
                .badRequest()
                .body(ResponseWrapperDTO
                        .<List<UserProfileDTO>>builder()
                        .errorMessage("Wrong authentication type")
                        .build()
                );
    }
}
