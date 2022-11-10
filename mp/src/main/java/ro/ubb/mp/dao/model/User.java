package ro.ubb.mp.dao.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity(name = "users")
@Table(
        name = "users",
        uniqueConstraints = {
        @UniqueConstraint(name = "email_unique", columnNames = "email")}
)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1)
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence")
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "fullName", nullable = false, columnDefinition = "TEXT")
    private String fullName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false, columnDefinition = "TEXT")
    private String password;
    private String profilePicture;


    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "interestAreas",
            joinColumns = @JoinColumn(name = "id"))
    private Set<String> interestAreas = new HashSet<String>();

    @Enumerated(EnumType.STRING)
    private Role role;
}
