package com.example.demo3.controller;


import com.example.demo3.dto.BookDTO;
import com.example.demo3.model.BookEntity;
import com.example.demo3.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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
          @RequestPart(value = "file", required = false) MultipartFile file,
          @RequestParam("ISBN") String ISBN,
          @RequestParam("bookName") String bookName,
          @RequestParam("publisher") String publisher,
          @RequestParam("author") String author,
          @RequestParam("publishDate") String publishDate,
          @RequestParam("genre") String genre,
          @RequestParam("pages") int pages,
          @RequestParam("description") String description
  ) {
    String fileName = (file != null) ? file.getOriginalFilename() : "no-image01.gif"; // 기본 이미지 URL
    BookDTO bookDTO = BookDTO.builder()
            .ISBN(ISBN)
            .bookName(bookName)
            .bookImgUrl(fileName)
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
   @RequestPart(value = "file", required = false)   MultipartFile file,
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
            .publisher(publisher)
            .author(author)
            .publishDate(publishDate)
            .genre(genre)
            .pages(pages)
            .description(description)
            .build();

    BookDTO updatedBook = bookService.updateBook(bookId, bookDTO, file);
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

  //책 검색
  @GetMapping("/getSearchList")
  @ResponseBody
  private List<BookEntity> getSearchList(@RequestParam(value = "keyword") String keyword, Model model) {
    BookDTO bookDTO = new BookDTO();
    bookDTO.setKeyword(keyword);
    return bookService.getSearchList(keyword);
  }

  @GetMapping("/getbooklist/{ISBN}")
  ResponseEntity<BookDTO> getBookByISBN(@PathVariable String ISBN) {
    BookDTO book = bookService.getBookByISBN(ISBN);
    if (book != null) {
      return new ResponseEntity<>(book, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @GetMapping("/import")
  public String importBooks() {
    bookService.saveBooksFromCSV();
    return "Books imported successfully";
  }
}
