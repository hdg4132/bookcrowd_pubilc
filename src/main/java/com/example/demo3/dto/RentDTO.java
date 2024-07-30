package com.example.demo3.dto;

import com.example.demo3.model.BookEntity;
import com.example.demo3.model.RentEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class RentDTO {
    private int rentId;
    private int keepingId;
    private int borrowedId;
    private String bookname;
    private String borrowedName;
    private String applicationDate;
    private String borrowDate;
    private String returnDate;
    private String ISBN;
    private String cause;
    private String approval;
    private String description;

    public RentDTO(final RentEntity entity) {
        this.rentId = entity.getRentId();
        this.keepingId = entity.getKeepingId();
        this.borrowedId = entity.getBorrowedId();
        this.bookname = entity.getBookname();
        this.borrowedName = entity.getBorrowedName();
        this.applicationDate = entity.getApplicationDate();
        this.borrowDate = entity.getBorrowDate();
        this.returnDate = entity.getReturnDate();
        this.ISBN = entity.getISBN();
        this.cause = entity.getCause();
        this.approval = entity.getApproval();
        this.description = entity.getDescription();
    }

    public static RentEntity toEntity(final RentDTO dto) {
        return RentEntity.builder()
                .rentId(dto.getRentId())
                .keepingId(dto.getKeepingId())
                .borrowedId(dto.getBorrowedId())
                .applicationDate(dto.getApplicationDate())
                .borrowedName(dto.getBorrowedName())
                .bookname(dto.getBookname())
                .borrowDate(dto.getBorrowDate())
                .returnDate(dto.getReturnDate())
                .ISBN(dto.getISBN())
                .cause(dto.getCause())
                .approval(dto.getApproval())
                .description(dto.getDescription())
                .build();
    }


}






