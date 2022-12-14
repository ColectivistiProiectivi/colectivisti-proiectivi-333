package ro.ubb.mp.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.ubb.mp.dao.model.InterestArea;

@Repository
public interface InterestAreaRepository extends JpaRepository<InterestArea, Long> {
}
