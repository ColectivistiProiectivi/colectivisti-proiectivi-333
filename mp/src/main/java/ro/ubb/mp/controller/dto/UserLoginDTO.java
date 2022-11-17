package ro.ubb.mp.controller.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class UserLoginDTO {
    @NotBlank
    private String email;
    @NotBlank
    private String password;
}
