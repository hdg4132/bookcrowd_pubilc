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

    public Page<KeepingDTO> searchKeepingsByUser (Long userId, String keyword, Pageable pageable) {
        return keepingRepository.searchKeepingsByUser(userId, keyword, pageable).map(KeepingDTO::new);
    }

    public Page<KeepingDTO> userGivenInfo(final Long userId, Pageable pageable) {
        log.info("Given information from user: {}", userId);
        return keepingRepository.findByUserId(userId, pageable)
                .map(KeepingDTO::new);
    }

    public List<KeepingEntity> getAllKeepingsByUserId(Long userId) {
        return keepingRepository.findByUserId(userId);
    }

    public Page<KeepingEntity> searchKeepings(Long userId, String keyword, Pageable pageable) {
        return keepingRepository.searchAllByKeyword(userId, keyword, pageable);
    }

    public KeepingDTO getKeepingById(int keepingId) {
        log.info("Fetching keeping by id: {}", keepingId);
        KeepingEntity keepingEntity = keepingRepository.findById(keepingId)
                .orElseThrow(() -> new IllegalArgumentException("No keeping found with id: " + keepingId));
        return new KeepingDTO(keepingEntity);
    }

    public Page<KeepingEntity> searchKeepingList(String keyword, Pageable pageable) {
        return keepingRepository.findByISBNContainingOrBookNameContaining( keyword, keyword, pageable);
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

        return new KeepingDTO(keepingEntity);
    }


    @Transactional
    public String updateKeepStatusAndQuantities(String ISBN, String bookName) {

        Optional<BookEntity> optionalBook = bookRepository.findByISBN(ISBN);
        if (!optionalBook.isPresent()) {
            throw new IllegalArgumentException("Book with ISBN " + ISBN + " not found");
        }

        BookEntity book = optionalBook.get();

        List<KeepingEntity> keepings = keepingRepository.findByISBN(ISBN);
        int stockIncrease = 0;
        int totalQuantityIncrease = 0;

        StringBuilder messageBuilder = new StringBuilder();
        boolean isAnyBookNameMismatch = false;

        for (KeepingEntity keeping : keepings) {
            if (keeping.getKeepStatus() == 0) {
                if (keeping.getBookId() == 0) {
                    keeping.setBookId(book.getBookId());
                }
                // BookName이 틀리면 수정하고 메시지에 추가
                if (!book.getBookName().equals(bookName)) {
                    keeping.setBookName(book.getBookName());
                    isAnyBookNameMismatch = true;
                    messageBuilder.append("KeepingEntity with ID ")
                            .append(keeping.getKeepingId())
                            .append(" has a mismatched bookName. Updated to correct bookName '")
                            .append(book.getBookName())
                            .append("'.\n");
                }

                keeping.setKeepStatus(1);
                keepingRepository.save(keeping);
                if (keeping.isRentable()) {
                    stockIncrease++;
                }
                totalQuantityIncrease++;
            }
        }

        book.setStock(book.getStock() + stockIncrease);
        book.setTotalQuantity(book.getTotalQuantity() + totalQuantityIncrease);
        bookRepository.save(book);

        log.info("KeepStatus and book quantities updated for ISBN: {}", ISBN);

        if (messageBuilder.length() == 0) {
            return "KeepStatus and quantities updated successfully.";
        } else {
            return messageBuilder.toString();
        }
    }

    public KeepingDTO returnedBook(KeepingEntity entity) {
        KeepingEntity keeping = keepingRepository.findById(entity.getKeepingId())
                .orElseThrow(() -> new IllegalArgumentException("There is no kept nor rented item"));
        if (keeping.getKeepStatus() != 2) {
            throw new RuntimeException("This book has never been rented");
        }

        BookEntity book = bookRepository.findById(keeping.getBookId())
                .orElseThrow(() -> new IllegalArgumentException("There is no such a book"));

        keeping.setKeepStatus(1); // 상태를 보관 중으로 변경
        keeping.setLastBorrowed(LocalDateTime.now()); // 반환 시각 업데이트
        keeping.setCount(keeping.getCount() + 1);
        keepingRepository.save(keeping);

        // 책 재고 증가
        book.setStock(book.getStock() + 1);
        bookRepository.save(book);

        log.info("Book returned: {}", book.getBookId());
        return new KeepingDTO(keeping);
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

    @Transactional
    public void initializeStockAndCreateKeepingForZeroQuantityBooks() {
        // Step 1: stock과 totalQuantity가 0인 도서를 조회합니다.
        List<BookEntity> zeroQuantityBooks = bookRepository.findByStockAndTotalQuantity(0, 0);

        for (BookEntity book : zeroQuantityBooks) {
            // Step 2: 각 도서의 stock과 totalQuantity를 1씩 증가시킵니다.
            book.setStock(1);
            book.setTotalQuantity(1);
            bookRepository.save(book);

            // Step 3: userId가 1인 새로운 키핑 엔티티를 생성합니다.
            KeepingEntity newKeeping = KeepingEntity.builder()
                    .userId(1L)  // userId가 1인 사용자
                    .bookId(book.getBookId())
                    .bookName(book.getBookName())
                    .ISBN(book.getISBN())
                    .keepStatus(1)  // 초기 상태
                    .keepDate(LocalDateTime.now())
                    .rentable(true)  // 기본적으로 대여 가능 상태로 설정
                    .build();

            keepingRepository.save(newKeeping);
        }

        log.info("Stock and totalQuantity initialized, and Keepings created for zero quantity books");
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

            BookEntity book = bookRepository.findById(keeping.getBookId())
                    .orElseThrow(() -> new IllegalArgumentException("There is no such a book"));
            // 책 재고 감소
            book.setStock(book.getStock() - 1);

            bookRepository.save(book);
            log.info("rent updated:{}", keeping.getKeepingId());
            return new KeepingDTO(keeping);
        } else {
            log.warn("rent not found: {}", entity.getKeepingId());
            throw new RuntimeException("rent not found");
        }
    }

}
