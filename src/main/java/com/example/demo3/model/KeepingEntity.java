package com.example.demo3.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "keepings")
public class KeepingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int keepingId;
    private String ISBN;
    private String bookName;
    private boolean rentable; //0: no, 1: yes
    private int keepStatus = 0; // 0: pending, 1: keeping, 2: rented, 3: returnRequest, 4: returned
    private String note;
    private LocalDateTime keepDate = LocalDateTime.now();
    private LocalDateTime lastBorrowed;
    private Long userId;
    private int bookId;
}
