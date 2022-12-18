package ro.ubb.mp.dao.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "assignments")
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(fetch = FetchType.LAZY)
    private List<User> students;

    @OneToOne(fetch = FetchType.LAZY)
    private User author;

    private String title;

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm")
    private Date startDate;

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm")
    private Date deadline;

    private String description;
    private Double maximumGrade;
}
