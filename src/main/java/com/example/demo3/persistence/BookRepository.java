package com.example.demo3.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo3.model.BookEntity;


public interface BookRepository extends JpaRepository<BookEntity, Integer> {

}
