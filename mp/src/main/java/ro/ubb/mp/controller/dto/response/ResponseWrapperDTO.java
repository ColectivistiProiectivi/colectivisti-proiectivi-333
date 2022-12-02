package ro.ubb.mp.controller.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseWrapperDTO<T> {

    private T value;
    private String errorMessage;
}
