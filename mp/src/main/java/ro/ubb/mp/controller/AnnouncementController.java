package ro.ubb.mp.controller;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ro.ubb.mp.controller.dto.request.AnnouncementRequestDTO;
import ro.ubb.mp.dao.model.Announcement;
import ro.ubb.mp.service.announcement.AnnouncementService;
import ro.ubb.mp.service.user.UserService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping
@Getter
public class AnnouncementController {
    @Autowired
    private AnnouncementService announcementService;
    private UserService userService;

    @GetMapping("/announcements")
    public ResponseEntity<List<Announcement>> getAnnouncements() {
        return ResponseEntity.ok().body(announcementService.getAll());

    }
   // @PostMapping("/add/announcement")
    //public void addAnnouncement(InterestArea, Long user_id, String title, BigDecimal price,
      //                          Date postingDate, String description){
        //Optional<User> user = userService.getUserById(user_id);
        //Announcement announcement = new Announcement(interestArea,title,price,new Date(),description);
        //this.announcementService.addAnnouncement(announcement);

 //   }
    @PostMapping("/addAnnouncement")
    public ResponseEntity<Announcement> addAnnouncement(@RequestBody AnnouncementRequestDTO announcement){
        URI uri = URI.create((ServletUriComponentsBuilder.fromCurrentContextPath().path("/addAnnouncement").toUriString()));

        return ResponseEntity.created(uri).body(getAnnouncementService().saveAnnouncement(announcement));
    }

}
