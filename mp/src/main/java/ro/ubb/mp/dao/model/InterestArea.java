package ro.ubb.mp.dao.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
public class InterestArea {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
}
