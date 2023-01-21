package ro.ubb.mp.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ro.ubb.mp.controller.dto.mapper.AnnouncementMapper;
import ro.ubb.mp.controller.dto.request.AnnouncementRequestDTO;
import ro.ubb.mp.controller.dto.response.announcement.AnnouncementResponseDTO;
import ro.ubb.mp.dao.model.Announcement;
import ro.ubb.mp.service.announcement.AnnouncementService;
import ro.ubb.mp.service.interestArea.InterestAreaService;
import ro.ubb.mp.service.user.UserService;

import javax.persistence.EntityNotFoundException;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/announcements")
@Getter
@RequiredArgsConstructor
public class AnnouncementController {

    private final AnnouncementService announcementService;
    private final UserService userService;
    private final AnnouncementMapper announcementMapper;
    private final InterestAreaService interestAreaService;

    @GetMapping()
    public ResponseEntity<List<AnnouncementResponseDTO>> getAnnouncements() {
        List<Announcement> announcements = announcementService.getAnnouncementsOrderedByDate();
        List<AnnouncementResponseDTO> announcementResponseDTOS = announcements.stream()
                .map(announcement -> getAnnouncementMapper().toDTO(announcement)).collect(Collectors.toList());

        return ResponseEntity.ok().body(announcementResponseDTOS);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<AnnouncementResponseDTO>> getAnnouncementsFilteredByInterestArea(
            @RequestParam(defaultValue = "") String q
    ) {
        List<Announcement> filteredAnnouncements = announcementService.getAnnouncementFilteredByTitleOrDescription(q);

        return ResponseEntity.ok().body(
                filteredAnnouncements
                        .stream()
                        .map(filteredAnnouncement -> getAnnouncementMapper().toDTO(filteredAnnouncement))
                        .toList()
        );
    }

    @PostMapping()
    public ResponseEntity<AnnouncementResponseDTO> addAnnouncement(@RequestBody AnnouncementRequestDTO announcement) {
        URI uri = URI.create((ServletUriComponentsBuilder.fromCurrentContextPath().path("/addAnnouncement").toUriString()));

        return ResponseEntity.created(uri).body(getAnnouncementMapper().toDTO(getAnnouncementService().saveAnnouncement(announcement)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deletePost(@PathVariable Long id) {

        final Announcement announcement = getAnnouncementService().findById(id).
                orElseThrow(EntityNotFoundException::new);
        announcementService.deleteAnnouncementById(announcement.getId());
        return new ResponseEntity<>(id, HttpStatus.OK);


    }


    @PutMapping("/{id}")
    public ResponseEntity<AnnouncementResponseDTO> updateAnnouncement(@RequestBody AnnouncementRequestDTO announcementRequestDTO,
                                                                      @PathVariable Long id) {
        return ResponseEntity.ok().body(getAnnouncementMapper().toDTO(getAnnouncementService().
                updateAnnouncement(announcementRequestDTO, id)));

    }
}
