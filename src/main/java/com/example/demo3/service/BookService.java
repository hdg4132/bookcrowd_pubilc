package com.example.demo3.service;

import com.example.demo3.dto.BookDTO;
import com.example.demo3.model.BookEntity;
import com.example.demo3.persistence.BookRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<BookDTO> getAllBooks() {
        List<BookEntity> books = bookRepository.findAll();
        return books.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public BookDTO getBookById(int bookId) {
        BookEntity book = bookRepository.findById(bookId).orElse(null);
        return (book != null) ? convertToDTO(book) : null;
    }

    public BookDTO addBook(BookDTO bookDTO, MultipartFile file) {
        // 파일 저장 처리

        BookEntity book = convertToEntity(bookDTO, file);
        BookEntity savedBook = bookRepository.save(book);
        return convertToDTO(savedBook);
    }

    public BookDTO updateBook(int bookId, BookDTO bookDTO) {
        BookEntity existingBook = bookRepository.findById(bookId).orElse(null);
        if (existingBook != null) {
            BeanUtils.copyProperties(bookDTO, existingBook, "bookId");
            bookRepository.save(existingBook);
            return convertToDTO(existingBook);
        }
        return null;
    }

    public boolean deleteBook(int bookId) {
        if (bookRepository.existsById(bookId)) {
            bookRepository.deleteById(bookId);
            return true;
        }
        return false;
    }

    private BookEntity convertToEntity(BookDTO bookDTO, MultipartFile file) {
        // 파일 저장 처리
        String filePath = saveFile(file);
        return BookEntity.builder()
                .bookId(bookDTO.getBookId())
                .ISBN(bookDTO.getISBN())
                .bookName(bookDTO.getBookName())
                .bookImgUrl(filePath)
                .publisher(bookDTO.getPublisher())
                .author(bookDTO.getAuthor())
                .publishDate(bookDTO.getPublishDate())
                .genre(bookDTO.getGenre())
                .pages(bookDTO.getPages())
                .description(bookDTO.getDescription())
                .available(bookDTO.getAvailable())
                .stock(bookDTO.getStock())
                .totalQuantity(bookDTO.getTotalQuantity())
                .build();
    }
    private BookDTO convertToDTO(BookEntity book) {
        return BookDTO.builder()
                .bookId(book.getBookId())
                .ISBN(book.getISBN())
                .bookName(book.getBookName())
                .bookImgUrl(book.getBookImgUrl())
                .publisher(book.getPublisher())
                .author(book.getAuthor())
                .publishDate(book.getPublishDate())
                .genre(book.getGenre())
                .pages(book.getPages())
                .description(book.getDescription())
                .available(book.getAvailable())
                .stock(book.getStock())
                .totalQuantity(book.getTotalQuantity())
                .build();
    }

    private String saveFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        String filePath = fileName;

        try {
            Path path = Paths.get(filePath);
            Files.write(path, file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }

        return filePath;
    }

}
