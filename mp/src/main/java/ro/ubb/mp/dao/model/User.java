package ro.ubb.mp.dao.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Stream;

@Data
@Entity(name = "users")
@Table(
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(name = "email_unique", columnNames = "username")}
)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;

    @Column(
            name = "fullName",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String fullName;

    @Column(
            name = "password",
            nullable = false,
            columnDefinition = "TEXT"
    )
    @JsonIgnore
    private String password;

    @Column(
            name = "username",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String username;
    private String profilePicture;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "interestAreas",
            joinColumns = @JoinColumn(name = "id")
    )
    private Set<String> interestAreas = new HashSet<>();

    @Enumerated(EnumType.STRING)
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Stream.of(getRole().toString())
                .map(SimpleGrantedAuthority::new)
                .toList();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
