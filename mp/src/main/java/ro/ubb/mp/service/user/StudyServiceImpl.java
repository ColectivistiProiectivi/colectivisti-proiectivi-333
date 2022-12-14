package ro.ubb.mp.service.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.ubb.mp.dao.model.Study;
import ro.ubb.mp.dao.repository.StudyRepository;

import java.util.List;

@Service("studyService")
@RequiredArgsConstructor
@Getter
public class StudyServiceImpl implements StudyService {

    private final StudyRepository studyRepository;

    @Override
    public List<Study> findAll() {
        return getStudyRepository().findAll();
    }
}
