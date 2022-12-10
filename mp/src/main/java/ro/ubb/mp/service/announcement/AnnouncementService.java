package ro.ubb.mp.service.announcement;

import lombok.Data;
import lombok.Getter;
import org.springframework.stereotype.Service;
import ro.ubb.mp.controller.dto.request.AnnouncementRequestDTO;
import ro.ubb.mp.dao.model.Announcement;
import ro.ubb.mp.dao.repository.AnnouncementRepository;

import java.util.List;

@Data
@Getter
@Service
public class AnnouncementService {
    private final AnnouncementRepository announcementRepository;

    public List<Announcement> getAll() {
        return announcementRepository.findAll();
    }

    public Announcement saveAnnouncement(AnnouncementRequestDTO announcementDTO) {

        final Announcement announcementToBeSaved = Announcement.builder()
                .description(announcementDTO.getDescription())
                .price(announcementDTO.getPrice())
                .title(announcementDTO.getTitle())
                .postingDate(announcementDTO.getPostingDate())
                .build();
        return announcementRepository.save(announcementToBeSaved);

    }
    public void deleteAnnouncementById(Long id){
        announcementRepository.deleteById(id);
    }

}
