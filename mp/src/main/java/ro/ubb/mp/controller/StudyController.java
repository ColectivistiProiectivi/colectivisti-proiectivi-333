package ro.ubb.mp.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.ubb.mp.controller.dto.mapper.StudyMapper;
import ro.ubb.mp.controller.dto.response.ResponseWrapperDTO;
import ro.ubb.mp.controller.dto.response.user.StudyResponseDTO;
import ro.ubb.mp.dao.model.Study;
import ro.ubb.mp.service.user.StudyService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/studies")
@RequiredArgsConstructor
@Getter
public class StudyController {

    private final StudyService studyService;
    private final StudyMapper studyMapper;

    @GetMapping()
    public ResponseEntity<ResponseWrapperDTO<List<StudyResponseDTO>>> getAll() {
        final List<Study> studies = getStudyService().findAll();

        List<StudyResponseDTO> dtos = new ArrayList<>();
        if(!studies.isEmpty()) {
            dtos = studies.stream()
                    .map(study -> getStudyMapper().toDto(study))
                    .collect(Collectors.toList());
        }

        return ResponseEntity.ok(
                ResponseWrapperDTO.<List<StudyResponseDTO>>builder()
                        .value(dtos)
                        .build()
        );

    }
}
