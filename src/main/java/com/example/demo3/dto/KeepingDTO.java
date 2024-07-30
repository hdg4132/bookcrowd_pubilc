package com.example.demo3.dto;

import com.example.demo3.model.BookEntity;
import com.example.demo3.model.KeepingEntity;
import com.example.demo3.model.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class KeepingDTO {
    private int keepingId;
    private int userId;  // 아직 userId 조합을 그냥 유저의 고유아이디 쓸지 이메일 쓸지 몰라서
    private int bookId;
    private String ISBN;
    private String bookName;
    private boolean rentable;
    private int keepStatus;
    private String note;
    private LocalDateTime keepDate;
    private LocalDateTime lastBorrowed;

    public KeepingDTO(final KeepingEntity entity) {
        this.keepingId = entity.getKeepingId();
        this.userId = entity.getUserId();
        this.bookId = entity.getBookId();
        this.ISBN = entity.getISBN();
        this.bookName = entity.getBookName();
        this.rentable = entity.isRentable();
        this.keepStatus = entity.getKeepStatus();
        this.note = entity.getNote();
        this.keepDate = entity.getKeepDate();
        this.lastBorrowed = entity.getLastBorrowed();
    }

    public static KeepingEntity toEntity(final KeepingDTO dto) {
        return KeepingEntity.builder()
                .keepingId(dto.getKeepingId())
                .userId(dto.getUserId())
                .bookId(dto.getBookId())
                .ISBN(dto.getISBN())
                .bookName(dto.getBookName())
                .rentable(dto.isRentable())
                .keepStatus(dto.getKeepStatus())
                .keepDate(dto.getKeepDate())
                .note(dto.getNote())
                .lastBorrowed(dto.getLastBorrowed())
                .build();
    }

}
