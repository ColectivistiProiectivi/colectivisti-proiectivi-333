package ro.ubb.mp.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ro.ubb.mp.controller.dto.mapper.AnnouncementMapper;
import ro.ubb.mp.controller.dto.request.AnnouncementRequestDTO;
import ro.ubb.mp.controller.dto.response.announcement.AnnouncementResponseDTO;
import ro.ubb.mp.dao.model.Announcement;
import ro.ubb.mp.service.announcement.AnnouncementService;
import ro.ubb.mp.service.user.UserService;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping
@Getter
@RequiredArgsConstructor
public class AnnouncementController {

    private final AnnouncementService announcementService;
    private final UserService userService;
    private final AnnouncementMapper announcementMapper;

    @GetMapping("/announcements")
    public ResponseEntity<List<AnnouncementResponseDTO>> getAnnouncements() {
        List<Announcement> announcements = announcementService.getAll();
        List<AnnouncementResponseDTO> announcementResponseDTOS = announcements.stream()
                .map(announcement -> getAnnouncementMapper().toDTO(announcement)).collect(Collectors.toList());

        return ResponseEntity.ok().body(announcementResponseDTOS);

    }

    @PostMapping("/addAnnouncement")
    public ResponseEntity<Announcement> addAnnouncement(@RequestBody AnnouncementRequestDTO announcement) {
        URI uri = URI.create((ServletUriComponentsBuilder.fromCurrentContextPath().path("/addAnnouncement").toUriString()));

        return ResponseEntity.created(uri).body(getAnnouncementService().saveAnnouncement(announcement));
    }

}
