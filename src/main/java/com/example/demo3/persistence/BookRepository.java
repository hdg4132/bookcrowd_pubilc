package com.example.demo3.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo3.model.BookEntity;

import java.util.Optional;


public interface BookRepository extends JpaRepository<BookEntity, Integer> {
    Optional<BookEntity> findByISBN(String ISBN);
}
