package ro.ubb.mp.controller.dto.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ro.ubb.mp.controller.dto.response.user.UserProfileDTO;
import ro.ubb.mp.dao.model.InterestArea;
import ro.ubb.mp.dao.model.Study;
import ro.ubb.mp.dao.model.User;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserProfileResponseMapper {

    @Mapping(target = "email", source = "username")
     UserProfileDTO toProfileDTO(User user);

     default List<String> mapCompletedStudies (List<Study> completedStudies) {

         if(completedStudies != null && !completedStudies.isEmpty()) {
             return completedStudies.stream().map(Study::getName).collect(Collectors.toList());
         }
         return null;
     }

    default String mapOngoingStudy (Study ongoingStudy) {

        if(ongoingStudy != null) {
            return ongoingStudy.getName();
        }
        return null;
    }

    default List<String> mapInterestAreas (Set<InterestArea> interestAreas) {

        if(interestAreas != null && !interestAreas.isEmpty()) {
            return interestAreas.stream().map(InterestArea::getName).collect(Collectors.toList());
        }
        return null;
    }
}
