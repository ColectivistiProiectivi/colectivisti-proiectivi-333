package ro.ubb.mp.service.interestArea;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.ubb.mp.dao.model.InterestArea;
import ro.ubb.mp.dao.repository.InterestAreaRepository;

import java.util.Optional;

@Service("interestAreaService")
@RequiredArgsConstructor
@Getter
public class InterestAreaServiceImpl implements InterestAreaService {
    private final InterestAreaRepository interestAreaRepository;

    @Override
    public Optional<InterestArea> findById(Long id) {
        return getInterestAreaRepository().findById(id);
    }
}
