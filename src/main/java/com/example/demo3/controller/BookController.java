package com.example.demo3.controller;

import com.example.demo3.dto.BookDTO;
import com.example.demo3.model.BookEntity;
import com.example.demo3.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/books")
public class BookController {
    @Autowired
    private BookService service;

    @PostMapping("/basic")
    public ResponseEntity<?> createBasicBookInfo(@RequestBody BookDTO dto) {
        try {
            BookEntity entity = BookDTO.toEntity(dto);
            entity.setBookId(0);
            BookDTO createdBook = service.createBasicInfo(entity);
            return ResponseEntity.ok(createdBook);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateBookInfo(@RequestBody BookDTO dto) {
        try {
            BookEntity entity = BookDTO.toEntity(dto);
            BookDTO updatedBook = service.updateBookInfo(entity);
            return ResponseEntity.ok(updatedBook);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllBooks() {
        try {
            List<BookDTO> books = service.getAllBooks();
            return ResponseEntity.ok(books);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
