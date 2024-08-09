package com.example.demo3.model;

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
@Table(name = "rents")
public class RentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rentId;
    private int keepingId;
    private int bookId;
    private Long borrowedId;
    private String bookname;
    private String borrowedName;
    private String applicationDate;
    private String borrowDate;
    private String returnDate;
    private String isbn;
    private String cause;
    private String approval;
    private String description;
    private int rentBookCount;
}
