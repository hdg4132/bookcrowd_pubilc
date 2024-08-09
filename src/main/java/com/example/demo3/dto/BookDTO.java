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
    private int available;
    private int stock;
    private int totalQuantity;

    private String keyword;
}






