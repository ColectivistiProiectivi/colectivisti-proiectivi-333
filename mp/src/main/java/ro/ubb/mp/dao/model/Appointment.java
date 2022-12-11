package ro.ubb.mp.dao.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User student;

    @ManyToOne(fetch = FetchType.LAZY)
    private User mentor;

    private Long announcement; // legam cand avem partea de anunturi

    private LocalDateTime date;

    private String locationDetails;
}
