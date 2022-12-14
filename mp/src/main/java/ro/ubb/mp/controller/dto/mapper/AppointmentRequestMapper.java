package ro.ubb.mp.controller.dto.mapper;

import org.mapstruct.Mapper;
import ro.ubb.mp.controller.dto.request.AppointmentRequestDTO;
import ro.ubb.mp.dao.model.Appointment;


@Mapper(componentModel = "spring")
public interface AppointmentRequestMapper {
    AppointmentRequestDTO toDTO(Appointment appointment);
}
