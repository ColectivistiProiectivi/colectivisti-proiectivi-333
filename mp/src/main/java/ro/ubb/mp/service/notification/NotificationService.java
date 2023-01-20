package ro.ubb.mp.service.notification;

import lombok.Data;
import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.ubb.mp.controller.dto.response.NotificationResponseDTO;
import ro.ubb.mp.controller.dto.response.PageResponseWrapperDTO;
import ro.ubb.mp.dao.model.Notification;
import ro.ubb.mp.dao.model.User;
import ro.ubb.mp.dao.repository.NotificationRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Getter
@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private static final Logger logger = LoggerFactory.getLogger(NotificationService.class);

    /**
     * @param notification notificarea pt un user dat
     * @return notificarea daca salvarea s-a efectuat cu succes, altfel null
     * OBS Vom salva notificari in cadrul functionalitatilor care vizeaza un user
     * ex pt un user student -> cand mentorul accepta participarea studentului la o meditatie -> salvam notificarea pt userul student
     * TODO
     */
    public Notification save(Notification notification) {
        try {

            return notificationRepository.save(notification);
        } catch (Exception e) {
            logger.error("Exception occur while save Notification ", e);

            return null;
        }
    }

    /**
     * @param id Long id
     *           TODO - un user sa isi stearga o anumita notificare
     */
    public void delete(Long id) {
        notificationRepository.deleteById(id);
    }

    /**
     * @param user     userul pt  care afisam notificarile
     * @param pageNr   nr paginii
     * @param pageSize nr de elemente de pe o pagina
     * @return un Obiect de tip PageResponseWrapperDTO care contine o lista de NotificationResponseDTO
     * PageResponseWrapperDTO furnizeaza detalii despre paginare
     */
    public PageResponseWrapperDTO<List<NotificationResponseDTO>> findByUserPaginated(User user, Integer pageNr, Integer pageSize) {
        Pageable firstPageWithLimitElement = PageRequest.of(pageNr, pageSize).withSort(Sort.Direction.DESC, "createdAt");
        Page<Notification> page = notificationRepository.findByUser(user, firstPageWithLimitElement);
        List<NotificationResponseDTO> notifications = page.getContent()
                .stream()
                .map(item -> {
                    return NotificationResponseDTO.builder()
                            .createdAt(item.getCreatedAt())
                            .isRead(item.isRead())
                            .message(item.getMessage())
                            .build();
                })
                .collect(Collectors.toList());

        return PageResponseWrapperDTO.<List<NotificationResponseDTO>>builder()
                .pageNr(page.getNumber())
                .pageSize(page.getSize())
                .totalItems(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .value(notifications)
                .build();
    }

    @Transactional
    public void markAsRead(User user, Long notificationId) {
        notificationRepository.findByUserAndId(user, notificationId).setRead(true);
    }

    public Integer countUnreadNotifications(User user) {
        List<Notification> notifications = notificationRepository.findByUser(user);
        int count = 0;
        for (Notification n : notifications) {
            if (!n.isRead()) {
                count = count + 1;
            }
        }
        return count;
    }

    public List<Notification> findAll(User user) {
        List<Notification> notifications = notificationRepository.findByUser(user);
        List<Notification> allNotifications = new ArrayList<>();
        for (Notification n : notifications) {
            if (!n.isRead()) {
                allNotifications.add(n);
            }
        }

        return allNotifications;
    }
}
