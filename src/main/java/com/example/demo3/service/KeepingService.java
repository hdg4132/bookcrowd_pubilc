package com.example.demo3.service;

import com.example.demo3.dto.KeepingDTO;
import com.example.demo3.model.BookEntity;
import com.example.demo3.model.KeepingEntity;
import com.example.demo3.persistence.BookRepository;
import com.example.demo3.persistence.KeepingRepository;
import com.example.demo3.persistence.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class KeepingService {

    @Autowired
    private KeepingRepository keepingRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestOperations restTemplate;

    public List<KeepingDTO> getAllKeepings() {
        log.info("All keeping List");
        return keepingRepository.findAll().stream()
                .map(KeepingDTO::new)
                .collect(Collectors.toList());
    }

    public List<KeepingDTO> userGivenInfo(final int userId) {
        log.info("Given information from user: {}", userId);
        return keepingRepository.findByUserId(userId).stream()
                .map(KeepingDTO::new)
                .collect(Collectors.toList());
    }

    public KeepingDTO getKeepingById(int keepingId) {
        log.info("Fetching keeping by id: {}", keepingId);
        KeepingEntity keepingEntity = keepingRepository.findById(keepingId)
                .orElseThrow(() -> new IllegalArgumentException("No keeping found with id: " + keepingId));
        return new KeepingDTO(keepingEntity);
    }

    @Transactional
    public KeepingDTO saveKeeping(KeepingDTO keepingDTO) {
        log.info("new keeping: {}", keepingDTO);
        int bookId = createBookId(keepingDTO.getBookName(), keepingDTO.getISBN());
        KeepingEntity keepingEntity = KeepingDTO.toEntity(keepingDTO);

//        keepingEntity.setUserId(userRepository.findById(keepingDTO.getUserId()).orElseThrow(() -> new IllegalArgumentException(" 맞는 유저가 없습니다")).getUserId());
//        keepingEntity.setBookId(bookRepository.findById(keepingDTO.getBookId()).orElseThrow(() -> new IllegalArgumentException(" 맞는 책이 없습니다")).getBookId());
        keepingEntity.setBookId(bookId);
        keepingEntity.setKeepStatus(1);
        keepingEntity.setKeepDate(LocalDateTime.now());

        keepingEntity = keepingRepository.save(keepingEntity);
        log.info("keeping sucess: {}", keepingEntity);
        return new KeepingDTO(keepingEntity);
    }

    private int createBookId(String bookName, String ISBN) {
        String url = "http://localhost:8080/books/basic";
        BookEntity bookEntity = new BookEntity();
        bookEntity.setBookName(bookName);
        bookEntity.setISBN(ISBN);

        BookEntity createdBook = restTemplate.postForObject(url, bookEntity, BookEntity.class);
        return createdBook != null ? createdBook.getBookId() : 0;
    }


    @Transactional
    public void borrowedBook(int keepingId, int userId) {
        KeepingEntity keeping = keepingRepository.findById(keepingId)
                .orElseThrow(() -> new IllegalArgumentException("There is no kept nor rented item"));
        if (keeping.getKeepStatus() != 1) {
            throw new RuntimeException("This book is currently all rented");
        }
        BookEntity book = bookRepository.findById(keeping.getBookId())
                .orElseThrow(() -> new IllegalArgumentException("There is not a matching book found"));
        if (book.getStock() <= 0) {
            throw new RuntimeException("All the books are currently rented");
        }

        keeping.setKeepStatus(2);
        keepingRepository.save(keeping);

        book.setStock(book.getStock() - 1);
        bookRepository.save(book);

        log.info("Book rented: {}", book.getBookId());
    }

    @Transactional
    public void returenedBook(int keepingId, int userId) {
        KeepingEntity keeping = keepingRepository.findById(keepingId)
                .orElseThrow(() -> new IllegalArgumentException("There is no kept nor returned item"));
        if(keeping.getKeepStatus() != 2) {
            throw new RuntimeException("This book has never been rented");
        }

        BookEntity book = bookRepository.findById(keepingId)
                .orElseThrow(() -> new IllegalArgumentException("There is no such a book"));

        keeping.setKeepStatus(1);
        keepingRepository.save(keeping);

        book.setStock(book.getStock() + 1);
        bookRepository.save(book);

        keeping.setLastBorrowed(LocalDateTime.now());
        keepingRepository.save(keeping);

        log.info("Book returned: {}", book.getBookId());
    }

    @Transactional
    public void requestReturn(int keepingId) {
        KeepingEntity keeping = keepingRepository.findById(keepingId)
                .orElseThrow(() -> new IllegalArgumentException("There is no kept item with id: " + keepingId));
        if (keeping.getKeepStatus() != 1) { // 2: rented 상태여야 반환 요청 가능
            throw new RuntimeException("This book is not currently rented");
        }
        keeping.setKeepStatus(3); // 3: returnRequest 상태로 변경
        keepingRepository.save(keeping);
        log.info("Return requested for keepingId: {}", keepingId);
    }

    public void approveReturn(int keepingId) {
        KeepingEntity keeping = keepingRepository.findById(keepingId)
                .orElseThrow(() -> new IllegalArgumentException("There is no kept item with id: " + keepingId));
        if (keeping.getKeepStatus() != 3) { // 3: returnRequest 상태여야 승인 가능
            throw new RuntimeException("This book is not in return request status");
        }
        keeping.setKeepStatus(4); // 4: returned 상태로 변경
        keepingRepository.save(keeping);
        log.info("Admin sent the book to the user", keepingId);
    }

    public  List<KeepingDTO> findByISBN(String ISBN) {
        log.info("List of all rentable");
        return keepingRepository.findByISBNAndRentableAndKeepStatus(ISBN, true, 1)
                .stream()
                .map(KeepingDTO::new)
                .collect(Collectors.toList());
    }

    public KeepingDTO Bookmatching(final KeepingEntity entity) {
        final Optional<KeepingEntity> original = keepingRepository.findById(entity.getKeepingId());
        if (original.isPresent()) {
            KeepingEntity keeping = original.get();
            keeping.setKeepingId(entity.getKeepingId());
            keeping.setKeepStatus(entity.getKeepStatus());
            keepingRepository.save(keeping);
            log.info("rent updated:{}", keeping.getKeepingId());
            return new KeepingDTO(keeping);
        } else {
            log.warn("rent not found: {}", entity.getKeepingId());
            throw new RuntimeException("rent not found");
        }
    }

    public KeepingDTO BookReturn(final KeepingEntity entity) {
        final Optional<KeepingEntity> original = keepingRepository.findById(entity.getKeepingId());
        if (original.isPresent()) {
            KeepingEntity keeping = original.get();
            keeping.setKeepingId(entity.getKeepingId());
            keeping.setKeepStatus(entity.getKeepStatus());
            keeping.setLastBorrowed(entity.getLastBorrowed());
            keepingRepository.save(keeping);
            log.info("rent updated:{}", keeping.getKeepingId());
            return new KeepingDTO(keeping);
        } else {
            log.warn("rent not found: {}", entity.getKeepingId());
            throw new RuntimeException("rent not found");
        }
    }
}
