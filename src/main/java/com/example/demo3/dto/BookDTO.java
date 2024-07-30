package com.example.demo3.dto;

import com.example.demo3.model.BookEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class BookDTO {
    private int bookId;
    private String ISBN;
    private String bookName;
    private String bookImgUrl;
    private String publisher;
    private String author;
    private String publishDate;
    private String genre;
    private int pages;
    private String description;
    private int stock;
    private int totalQuantity;

    public BookDTO(final BookEntity entity) {
        this.bookId = entity.getBookId();
        this.ISBN = entity.getISBN();
        this.bookName = entity.getBookName();
        this.bookImgUrl = entity.getBookImgUrl();
        this.publisher = entity.getPublisher();
        this.author = entity.getAuthor();
        this.publishDate = entity.getPublishDate();
        this.genre = entity.getGenre();
        this.pages = entity.getPages();
        this.description = entity.getDescription();
        this.stock = entity.getStock();
        this.totalQuantity = entity.getTotalQuantity();
    }

    public static BookEntity toEntity(final BookDTO dto) {
        return BookEntity.builder()
                .bookId(dto.getBookId())
                .ISBN(dto.getISBN())
                .bookName(dto.getBookName())
                .bookImgUrl(dto.getBookImgUrl())
                .publisher(dto.getPublisher())
                .author(dto.getAuthor())
                .publishDate(dto.getPublishDate())
                .genre(dto.getGenre())
                .pages(dto.getPages())
                .description(dto.getDescription())
                .stock(dto.getStock())
                .totalQuantity(dto.getTotalQuantity())
                .build();
    }
}






