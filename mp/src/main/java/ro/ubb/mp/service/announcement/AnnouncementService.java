package ro.ubb.mp.service.announcement;

import ro.ubb.mp.controller.dto.request.AnnouncementRequestDTO;
import ro.ubb.mp.dao.model.Announcement;

import java.util.List;
import java.util.Optional;

public interface AnnouncementService {
    Optional<Announcement> findById(Long id);

    List<Announcement> getAll();

    List<Announcement> getAnnouncementsOrderedByDate();

    List<Announcement> getAnnouncementFilteredByTitleOrDescription(String queryString);

    Announcement saveAnnouncement(AnnouncementRequestDTO announcementRequestDTO);

    Announcement updateAnnouncement(AnnouncementRequestDTO announcementRequestDTO, Long id);

    void deleteAnnouncementById(Long id);

}
