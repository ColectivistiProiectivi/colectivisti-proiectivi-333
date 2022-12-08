package ro.ubb.mp.dao.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity(name = "users")
public class User {

    @GeneratedValue
    @Id
    private Long id;

    private String firstName;
    private String lastName;
}
