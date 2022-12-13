package ro.ubb.mp.service.user;

import ro.ubb.mp.dao.model.Study;

import java.util.List;

public interface StudyService {

    List<Study> findAll();
}
