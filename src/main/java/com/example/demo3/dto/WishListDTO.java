package com.example.demo3.dto;

import com.example.demo3.model.WishListEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class WishListDTO {
    private int id;
    private Long userId;
    private String isbn;


    public WishListDTO(final WishListEntity entity){
        this.id = entity.getId();
        this.userId = entity.getUserId();
        this.isbn = entity.getIsbn();
    }

    public static WishListEntity toEntity(final WishListDTO dto){
        return WishListEntity.builder()
                .id(dto.getId())
                .userId(dto.getUserId())
                .isbn(dto.getIsbn())
                .build();
    }
}
