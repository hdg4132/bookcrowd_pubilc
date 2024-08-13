package com.example.demo3.model;

import com.mysql.cj.protocol.ColumnDefinition;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "books")
public class BookEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto increment 설정
    private int bookId;
    private String ISBN;
    private String bookName;
    private String bookImgUrl;
    private String publisher;
    private String author;
    private String publishDate;
    private String genre;
    private int pages;
    @Lob
    @Column(columnDefinition = "text")
    private String description;
    private int stock;
    private int totalQuantity;

}
