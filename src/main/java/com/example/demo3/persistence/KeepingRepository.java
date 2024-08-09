package com.example.demo3.persistence;

import com.example.demo3.model.KeepingEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KeepingRepository extends JpaRepository <KeepingEntity, Integer> {
    Page<KeepingEntity> findByUserId(Long userId, Pageable pageable);
    List<KeepingEntity> findByISBN(String ISBN);
    Page<KeepingEntity> findByKeepStatus(int keepStatus, Pageable pageable);
    List<KeepingEntity> findByISBNAndRentableAndKeepStatus(String ISBN, boolean rentable, int keepStatus);
    List<KeepingEntity> findByUserId(Long userId);
    List<KeepingEntity> findByBookIdAndLastBorrowedIsNullOrderByKeepDateAsc(int bookId);
    List<KeepingEntity> findByBookIdAndLastBorrowedIsNotNullOrderByLastBorrowedAsc(int bookId);
    Page<KeepingEntity> findByISBNContainingOrBookNameContaining (String ISBNKeyword, String bookNameKeyword, Pageable pageable);
    @Query("SELECT k FROM KeepingEntity k WHERE k.userId = :userId AND (" +
            "k.bookName LIKE %:keyword% OR " +
            "k.ISBN LIKE %:keyword% OR " +
            "k.note LIKE %:keyword%)")
    Page<KeepingEntity> searchKeepingsByUser(@Param("userId") Long userId, @Param("keyword") String keyword, Pageable pageable);
}
