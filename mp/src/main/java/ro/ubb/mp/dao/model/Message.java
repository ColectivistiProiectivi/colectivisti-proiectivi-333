package ro.ubb.mp.dao.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @ManyToOne(fetch = FetchType.LAZY)
    private User sender;

    @Column
    @ManyToOne(fetch = FetchType.LAZY)
    private User receiver;

    @Column
    private String content;

    @Column
    private LocalDateTime time;


}
