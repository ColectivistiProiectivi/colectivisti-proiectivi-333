package ro.ubb.mp.controller.dto.mapper;

import org.mapstruct.Mapper;
import ro.ubb.mp.controller.dto.response.user.UserFullNameDTO;
import ro.ubb.mp.dao.model.User;

@Mapper(componentModel = "spring")
public interface UserFullNameMapper {
    UserFullNameDTO toDTO(User user);
}
