package ro.ubb.mp.dao.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
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

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(name = "assignment_student_xref",
            joinColumns = @JoinColumn(name = "assignment_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> students;

//    @OneToOne(cascade = {
//            CascadeType.PERSIST,
//            CascadeType.MERGE
//    })
//    @JoinTable(name = "assignment_author_xref",
//            joinColumns = @JoinColumn(name = "assignment_id"),
//            inverseJoinColumns = @JoinColumn(name = "user_id")
//    )
    @ManyToOne(fetch = FetchType.LAZY)
    private User author;

    private String title;
    private Timestamp startDate;
    private Timestamp deadline;
    private String description;
    private Double maximumGrade;
}
