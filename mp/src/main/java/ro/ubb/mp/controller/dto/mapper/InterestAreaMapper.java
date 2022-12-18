package ro.ubb.mp.controller.dto.mapper;

import org.mapstruct.Mapper;
import ro.ubb.mp.controller.dto.response.user.InterestAreaResponseDTO;
import ro.ubb.mp.dao.model.InterestArea;

@Mapper(componentModel = "spring")
public interface InterestAreaMapper {

    InterestAreaResponseDTO toDto(InterestArea interestArea);
}
