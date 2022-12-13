package ro.ubb.mp.controller;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.ubb.mp.controller.dto.mapper.InterestAreaMapper;
import ro.ubb.mp.controller.dto.response.ResponseWrapperDTO;
import ro.ubb.mp.controller.dto.response.user.InterestAreaResponseDTO;
import ro.ubb.mp.dao.model.InterestArea;
import ro.ubb.mp.service.user.InterestAreaService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/interest-areas")
@RequiredArgsConstructor
@Getter
public class InterestAreaController {

    private final InterestAreaService interestAreaService;
    private final InterestAreaMapper interestAreaMapper;

    @GetMapping()
    public ResponseEntity<ResponseWrapperDTO<List<InterestAreaResponseDTO>>> getAll() {
        final List<InterestArea> interestAreas = getInterestAreaService().findAll();

        List<InterestAreaResponseDTO> dtos = new ArrayList<>();
        if(!interestAreas.isEmpty()) {
            dtos = interestAreas.stream()
                    .map(interestArea -> getInterestAreaMapper().toDto(interestArea))
                    .collect(Collectors.toList());
        }

        return ResponseEntity.ok(
                ResponseWrapperDTO.<List<InterestAreaResponseDTO>>builder()
                        .value(dtos)
                        .build()
        );

    }
}
