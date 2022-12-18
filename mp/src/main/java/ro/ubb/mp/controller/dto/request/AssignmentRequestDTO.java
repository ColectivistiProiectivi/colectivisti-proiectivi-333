package ro.ubb.mp.controller.dto.request;

import ro.ubb.mp.dao.model.User;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

public class AssignmentRequestDTO {
    private Long id;
    private List<User> students;
    private User author;
    private String title;
    private Date startDate;
    private Date deadline;
    private String description;
    private Double maximumGrade;
}
