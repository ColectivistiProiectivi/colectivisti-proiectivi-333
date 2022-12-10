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

    @ManyToOne
    @JoinColumn(name = "studentId")
    private User student;

    @ManyToOne
    @JoinColumn(name = "mentorId")
    private User mentor;

    private Long announcement; // legam cand avem partea de anunturi

    private LocalDateTime date;

    private String locationDetails;
}
