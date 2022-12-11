package ro.ubb.mp.service.interestArea;

import ro.ubb.mp.dao.model.InterestArea;

import java.util.Optional;

public interface InterestAreaService {
    Optional<InterestArea> findById(Long id);

}
