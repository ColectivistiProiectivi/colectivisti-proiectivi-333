package ro.ubb.mp.controller.dto.response;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;
import ro.ubb.mp.controller.dto.response.user.UserFullNameDTO;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
public class MessageResponseDTO {
    private Long id;
    private UserFullNameDTO sender;
    private UserFullNameDTO receiver;
    private String content;
    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss[.SSS][.SS][.S]")
    private Date time;
}
