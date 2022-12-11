package ro.ubb.mp.service.announcement;

import lombok.Data;
import lombok.Getter;
import org.springframework.stereotype.Service;
import ro.ubb.mp.controller.dto.request.AnnouncementRequestDTO;
import ro.ubb.mp.dao.model.Announcement;
import ro.ubb.mp.dao.model.InterestArea;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.dao.repository.AnnouncementRepository;
import ro.ubb.mp.service.interestArea.InterestAreaService;
import ro.ubb.mp.service.user.UserService;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.List;

@Data
@Getter
@Service
public class AnnouncementService {
    private final AnnouncementRepository announcementRepository;
    private final UserService userService;
    private final InterestAreaService interestAreaService;


    public List<Announcement> getAll() {
        return announcementRepository.findAll();
    }

    public Announcement saveAnnouncement(AnnouncementRequestDTO announcementDTO) {
        final User user = getUserService().getUserById(announcementDTO.getUserId()).
                orElseThrow(EntityNotFoundException::new);
        final InterestArea interestArea = getInterestAreaService().findById(announcementDTO.getInterestAreasId()).
                orElseThrow(EntityNotFoundException::new);

        final Announcement announcementToBeSaved = Announcement.builder()
                .description(announcementDTO.getDescription())
                .price(announcementDTO.getPrice())
                .title(announcementDTO.getTitle())
                .postingDate(announcementDTO.getPostingDate())
                .user(user)
                .interestAreas(interestArea)
                .build();
        return announcementRepository.save(announcementToBeSaved);

    }

    public void deleteAnnouncementById(Long id) {
        announcementRepository.deleteById(id);
    }

}
