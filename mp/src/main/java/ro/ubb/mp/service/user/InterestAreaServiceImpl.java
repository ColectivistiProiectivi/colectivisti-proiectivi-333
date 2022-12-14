package ro.ubb.mp.service.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.ubb.mp.dao.model.InterestArea;
import ro.ubb.mp.dao.repository.InterestAreaRepository;

import java.util.List;

@Service("interestArea")
@RequiredArgsConstructor
@Getter
public class InterestAreaServiceImpl implements InterestAreaService {

    private final InterestAreaRepository interestAreaRepository;

    @Override
    public List<InterestArea> findAll() {
        return getInterestAreaRepository().findAll();
    }
}
