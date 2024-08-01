package com.example.demo3.service;

import com.example.demo3.dto.BookDTO;
import com.example.demo3.model.BookEntity;
import com.example.demo3.persistence.BookRepository;
import com.example.demo3.persistence.KeepingRepository;
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

    @Autowired
    private KeepingRepository keepingRepository;

    @Autowired
    private KeepingService keepingService;

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
        Optional<BookEntity> original = bookRepository.findById(entity.getBookId());
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
            bookRepository.save(book);
            log.info("Book updated:{}", book.getBookId());
            keepingService.updateKeepStatusAndQuantities(entity.getISBN());
            return new BookDTO(book);

        } else {
            BookEntity newBook = new BookEntity();
            newBook.setBookName(entity.getBookName());
            newBook.setISBN(entity.getISBN());
            newBook.setAuthor(entity.getAuthor());
            newBook.setPublishDate(entity.getPublishDate());
            newBook.setGenre(entity.getGenre());
            newBook.setPages(entity.getPages());
            newBook.setDescription(entity.getDescription());
            bookRepository.save(newBook);
            log.info("New book created: {}", newBook.getBookId());
            keepingService.updateKeepStatusAndQuantities(entity.getISBN());
            return new BookDTO(newBook);
        }
    }


}
