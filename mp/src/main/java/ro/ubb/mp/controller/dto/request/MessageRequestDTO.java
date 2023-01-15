package ro.ubb.mp.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
public class MessageRequestDTO {
    private Long id;
    private Long senderId;
    private Long receiverId;
    private String content;
    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss[.SSS][.SS][.S]")
    private Date time;
}
