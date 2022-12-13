package ro.ubb.mp.controller.dto.mapper;

import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import ro.ubb.mp.controller.dto.request.ProfileRequestDTO;
import ro.ubb.mp.dao.model.User;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public abstract class UserProfileRequestMapper {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Named("encodePasswordForEntity")
    String encodePasswordForEntity(String password) {
        return passwordEncoder.encode(password);
    }
    @Mapping(target = "password", qualifiedByName = "encodePasswordForEntity")
    public abstract void update(@MappingTarget User user, ProfileRequestDTO dto);


}
