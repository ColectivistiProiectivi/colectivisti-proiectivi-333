package ro.ubb.mp.controller.dto.mapper;

import org.mapstruct.Mapper;
import ro.ubb.mp.controller.dto.response.AppointmentResponseDTO;
import ro.ubb.mp.dao.model.Appointment;

@Mapper(componentModel = "spring")
public interface AppointmentResponseMapper {
    AppointmentResponseDTO toDTO(Appointment appointment);
}
