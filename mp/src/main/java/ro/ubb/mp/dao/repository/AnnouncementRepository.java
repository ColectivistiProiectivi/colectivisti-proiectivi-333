package ro.ubb.mp.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.ubb.mp.dao.model.Announcement;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

}
