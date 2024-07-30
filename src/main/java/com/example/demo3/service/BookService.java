package com.example.demo3.service;

import com.example.demo3.dto.BookDTO;
import com.example.demo3.model.BookEntity;
import com.example.demo3.persistence.BookRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public List<BookDTO> getAllBooks() {
        log.info("List of all the books");
        return bookRepository.findAll().stream()
                .map(BookDTO::new)
                .collect(Collectors.toList());
    }

    public BookDTO createBasicInfo(final BookEntity entity) {
        validateBasicInfo(entity);
        bookRepository.save(entity);
        log.info("Submitted new book: {}", entity.getBookId());
        return new BookDTO(entity);
    }


    private void validateBasicInfo(BookEntity entity) {
        if (entity == null || entity.getBookName() == null || entity.getISBN() == null) {
            log.warn("Invalid basic info: {}", entity);
            throw new RuntimeException("You MUST have bookName and ISBN");
        }
    }

    private void validateFullInfo(BookEntity entity) {
        if (entity == null || entity.getBookId() == 0 || entity.getBookName() == null || entity.getISBN() == null) {
            log.warn("Invalid full info: {}", entity);
            throw new RuntimeException("BookId bookName and ISBN must not be null");
        }
    }

    public BookDTO updateBookInfo(final BookEntity entity) {
        validateFullInfo(entity);
        final Optional<BookEntity> original = bookRepository.findById(entity.getBookId());
        if (original.isPresent()) {
            BookEntity book = original.get();
            book.setBookName(entity.getBookName());
            book.setBookImgUrl(entity.getBookImgUrl());
            book.setPublisher(entity.getPublisher());
            book.setAuthor(entity.getAuthor());
            book.setPublishDate(entity.getPublishDate());
            book.setGenre(entity.getGenre());
            book.setPages(entity.getPages());
            book.setDescription(entity.getDescription());
            book.setTotalQuantity(entity.getTotalQuantity());
            book.setStock(entity.getStock());
            bookRepository.save(book);
            log.info("Book updated:{}", book.getBookId());
            return new BookDTO(book);
        } else {
            log.warn("Book not found: {}", entity.getBookId());
            throw new RuntimeException("Book not found");
        }
    }

    @Transactional
    public int createBookId(String bookName, String ISBN) {
        BookEntity bookEntity = new BookEntity();
        bookEntity.setBookName(bookName);
        bookEntity.setISBN(ISBN);
        BookEntity savedBook = bookRepository.save(bookEntity);
        return savedBook.getBookId();
    }


//    @Transactional
//    public void updateBookStatus(int bookId, int keepStatus) {
//        BookEntity book = bookRepository.findById(bookId)
//                .orElseThrow(() -> new IllegalArgumentException("There is no books to update"));
//
//        KeepingService.updateKeepStatusByBookId(bookId,keepStatus);
//    }
}
