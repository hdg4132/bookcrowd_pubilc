package com.example.demo3.persistence;


import com.example.demo3.model.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<BookEntity, Integer> {
    Optional<BookEntity> findByISBN(String ISBN);
    List<BookEntity> findByBookNameContainingOrDescriptionContaining(String bookName, String description);

}
