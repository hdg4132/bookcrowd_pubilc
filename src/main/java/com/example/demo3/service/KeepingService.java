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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;



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


    public Page<KeepingDTO> getAllKeepings(Pageable pageable) {
        log.info("All keeping List");
        return keepingRepository.findAll(pageable)
                .map(KeepingDTO::new);
    }

    public Page<KeepingDTO> userGivenInfo(final String userId, Pageable pageable) {
        log.info("Given information from user: {}", userId);
        return keepingRepository.findByUserId(userId, pageable)
                .map(KeepingDTO::new);
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

        KeepingEntity keepingEntity = KeepingDTO.toEntity(keepingDTO);
        keepingEntity.setUserId(userRepository.findById(keepingDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("맞는 유저가 없습니다")).getUserId());
        keepingEntity.setKeepStatus(0); // 0: 초기 상태
        keepingEntity.setKeepDate(LocalDateTime.now());

        keepingEntity = keepingRepository.save(keepingEntity);
        log.info("keeping success: {}", keepingEntity);

        int bookId = createOrUpdateBook(keepingDTO.getBookName(), keepingDTO.getISBN(), keepingDTO.isRentable());
        keepingEntity.setBookId(bookId);
        keepingRepository.save(keepingEntity);

        return new KeepingDTO(keepingEntity);
    }

    private int createOrUpdateBook(String bookName, String ISBN, boolean rentable) {
        Optional<BookEntity> existingBook = bookRepository.findByISBN(ISBN);
        if (existingBook.isPresent()) {
            // 기존 책 정보가 존재하는 경우, bookId 반환
            return existingBook.get().getBookId();
        } else {
            // 새 책 정보 생성
            BookEntity bookEntity = new BookEntity();
            bookEntity.setBookName(bookName);
            bookEntity.setISBN(ISBN);
            bookEntity.setStock(0);
            bookEntity.setTotalQuantity(0);
            bookRepository.save(bookEntity);
            log.info("New book created with ISBN: {}", ISBN);
            return bookEntity.getBookId();
        }
    }

    @Transactional
    public void updateKeepStatusAndQuantities(String ISBN) {
        List<KeepingEntity> keepings = keepingRepository.findByISBN(ISBN);
        int stockIncrease = 0;
        int totalQuantityIncrease = 0;

        for (KeepingEntity keeping : keepings) {
            if (keeping.getKeepStatus() == 0) {
                keeping.setKeepStatus(1);
                keepingRepository.save(keeping);
                if (keeping.isRentable()) {
                    stockIncrease++;
                }
                totalQuantityIncrease++;
            }
        }

        Optional<BookEntity> optionalBook = bookRepository.findByISBN(ISBN);
        if (optionalBook.isPresent()) {
            BookEntity book = optionalBook.get();
            book.setStock(book.getStock() + stockIncrease);
            book.setTotalQuantity(book.getTotalQuantity() + totalQuantityIncrease);
            bookRepository.save(book);
        }

        log.info("KeepStatus and book quantities updated for ISBN: {}", ISBN);
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
    public void returnedBook(int keepingId, int userId) {
        KeepingEntity keeping = keepingRepository.findById(keepingId)
                .orElseThrow(() -> new IllegalArgumentException("There is no kept nor returned item"));
        if (keeping.getKeepStatus() != 2) {
            throw new RuntimeException("This book has never been rented");
        }

        BookEntity book = bookRepository.findById(keeping.getBookId())
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
        if (keeping.getKeepStatus() != 1) {
            throw new RuntimeException("This book is either pending or renting");
        }
        keeping.setKeepStatus(3); // 3: returnRequest 상태로 변경
        keepingRepository.save(keeping);
        log.info("Return requested for keepingId: {}", keepingId);
    }

    @Transactional
    public void approveReturn(int keepingId) {
        KeepingEntity keeping = keepingRepository.findById(keepingId)
                .orElseThrow(() -> new IllegalArgumentException("There is no kept item with id: " + keepingId));
        if (keeping.getKeepStatus() != 3) { // 3: returnRequest 상태여야 승인 가능
            throw new RuntimeException("This book is not in return request status");
        }

        keeping.setKeepStatus(4); // 4: returned 상태로 변경
        keepingRepository.save(keeping);

        BookEntity book = bookRepository.findById(keeping.getBookId())
                .orElseThrow(() -> new IllegalArgumentException("There is no such a book"));

        // stock 및 totalQuantity 감소
        if (keeping.isRentable()) {
            book.setStock(book.getStock() - 1);
            book.setTotalQuantity(book.getTotalQuantity() - 1);
        } else {
            book.setTotalQuantity(book.getTotalQuantity() - 1);
        }
        bookRepository.save(book);

        log.info("Book stock and totalQuantity decreased for bookId: {}", book.getBookId());
    }
    public Page<KeepingDTO> getKeepingsByStatus(int keepStatus, Pageable pageable) {
        log.info("Fetching keepings by status: {}", keepStatus);
        return keepingRepository.findByKeepStatus(keepStatus, pageable)
                .map(KeepingDTO::new);
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
