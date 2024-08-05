package com.example.demo3.controller;


import com.example.demo3.dto.BookDTO;
import com.example.demo3.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/books")
public class BookController {

  private final BookService bookService;

  @Autowired
  public BookController(BookService bookService) {
    this.bookService = bookService;
  }

  // 전체 책 목록 조회
  @GetMapping
  public ResponseEntity<List<BookDTO>> getAllBooks() {
    List<BookDTO> books = bookService.getAllBooks();
    return new ResponseEntity<>(books, HttpStatus.OK);
  }

  // 책 상세 정보 조회
  @GetMapping("/{id}")
  public ResponseEntity<BookDTO> getBookById(@PathVariable("id") int bookId) {
    BookDTO book = bookService.getBookById(bookId);
    if (book != null) {
      return new ResponseEntity<>(book, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  // 새 책 추가
  @PostMapping("/write")
  public ResponseEntity<BookDTO> addBook(
          @RequestPart("file") MultipartFile file,
          @RequestParam("ISBN") String ISBN,
          @RequestParam("bookName") String bookName,
          @RequestParam("publisher") String publisher,
          @RequestParam("author") String author,
          @RequestParam("publishDate") String publishDate,
          @RequestParam("genre") String genre,
          @RequestParam("pages") int pages,
          @RequestParam("description") String description
  ) {
    String fileName = file.getOriginalFilename();
    Path filePath = Paths.get("src/main/resources/static/files/" + fileName);
    String ext = fileName.substring(fileName.indexOf("."));
    String changeName = ISBN + ext;
    try {
      Files.write(filePath, file.getBytes());
    } catch (IOException e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    BookDTO bookDTO = BookDTO.builder()
            .ISBN(ISBN)
            .bookName(bookName)
            .bookImgUrl(file.getOriginalFilename())
            .publisher(publisher)
            .author(author)
            .publishDate(publishDate)
            .genre(genre)
            .pages(pages)
            .description(description)
            .build();
    BookDTO addedBook = bookService.addBook(bookDTO, file);
    return new ResponseEntity<>(addedBook, HttpStatus.CREATED);
  }

  // 책 정보 수정
  @PutMapping("/edit/{id}")
  public ResponseEntity<BookDTO> updateBook
  (@PathVariable("id") int bookId,
   @RequestPart("file") MultipartFile file,
   @RequestParam("ISBN") String ISBN,
   @RequestParam("bookName") String bookName,
   @RequestParam("publisher") String publisher,
   @RequestParam("author") String author,
   @RequestParam("publishDate") String publishDate,
   @RequestParam("genre") String genre,
   @RequestParam("pages") int pages,
   @RequestParam("description") String description) {
    BookDTO bookDTO = BookDTO.builder()
            .ISBN(ISBN)
            .bookName(bookName)
            .bookImgUrl(file.getOriginalFilename())
            .publisher(publisher)
            .author(author)
            .publishDate(publishDate)
            .genre(genre)
            .pages(pages)
            .description(description)
            .build();

    BookDTO updatedBook = bookService.updateBook(bookId, bookDTO);
    if (updatedBook != null) {
      return new ResponseEntity<>(updatedBook, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  // 책 삭제
  @DeleteMapping("/delete/{id}")
  public ResponseEntity<Void> deleteBook(@PathVariable("id") int bookId) {
    boolean deleted = bookService.deleteBook(bookId);
    if (deleted) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}
