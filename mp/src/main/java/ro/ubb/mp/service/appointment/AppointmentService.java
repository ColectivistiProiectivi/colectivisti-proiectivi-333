package ro.ubb.mp.service.appointment;

import ro.ubb.mp.controller.dto.response.AppointmentResponseDTO;
import ro.ubb.mp.controller.dto.response.PageResponseWrapperDTO;
import ro.ubb.mp.dao.model.User;

import java.util.List;

public interface AppointmentService {
    public PageResponseWrapperDTO<List<AppointmentResponseDTO>> getAppointmentsStudentPaginated(User student, Integer pageNo, Integer pageSize);
    public PageResponseWrapperDTO<List<AppointmentResponseDTO>> getAppointmentsMentorPaginated(User mentor, Integer pageNo, Integer pageSize);
}
