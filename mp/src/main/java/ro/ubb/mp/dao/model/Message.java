package ro.ubb.mp.dao.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
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


    @ManyToOne(fetch = FetchType.LAZY)
    private User sender;


    @ManyToOne(fetch = FetchType.LAZY)
    private User receiver;


    private String content;


    private Date time;


}
