package ro.ubb.mp.dao.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.ubb.mp.dao.model.Notification;
import ro.ubb.mp.dao.model.User;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    Page<Notification> findByUser(User user, Pageable pageable);

    List<Notification> findByUser(User user);

    Notification findByUserAndId(User user, Long id);
}
