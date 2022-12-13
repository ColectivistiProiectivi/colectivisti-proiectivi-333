package ro.ubb.mp.controller.dto.response;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
public class PageResponseWrapperDTO<T> extends ResponseWrapperDTO<T> {
    private Integer pageNr;
    private Integer totalPages;
    private Long totalItems;
    private Integer pageSize;
}
