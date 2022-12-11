package ro.ubb.mp.controller.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class UserLoginDTO {
    @NotBlank
    private String email;
    @NotBlank
    @Size(min = 7)
    private String password;
}
