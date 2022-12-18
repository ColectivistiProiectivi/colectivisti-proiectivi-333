package ro.ubb.mp.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.ubb.mp.dao.model.Assignment;
import ro.ubb.mp.dao.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssignmentRepository  extends JpaRepository<Assignment, Long> {

    Optional<Assignment> findByTitle(String title);

    Assignment findByAuthor(User mentor);

    List<Assignment> findByStudents(User student);
}
