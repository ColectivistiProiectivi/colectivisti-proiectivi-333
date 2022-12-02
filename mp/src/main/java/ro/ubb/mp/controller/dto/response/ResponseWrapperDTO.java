package ro.ubb.mp.controller.dto.response;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
public class ResponseWrapperDTO<T> {
    private T value;
    private String errorMessage;
}
