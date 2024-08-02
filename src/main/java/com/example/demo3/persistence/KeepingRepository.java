package com.example.demo3.persistence;

import com.example.demo3.model.KeepingEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KeepingRepository extends JpaRepository <KeepingEntity, Integer> {
    Page<KeepingEntity> findByUserId(String userId, Pageable pageable);
    List<KeepingEntity> findByISBN(String ISBN);
    Page<KeepingEntity> findByKeepStatus(int keepStatus, Pageable pageable);
    List<KeepingEntity> findByISBNAndRentableAndKeepStatus(String ISBN, boolean rentable, int keepStatus);
    List<KeepingEntity> findByUserId(String userId);
    List<KeepingEntity> findByBookIdAndLastBorrowedIsNullOrderByKeepDateAsc(int bookId);
    List<KeepingEntity> findByBookIdAndLastBorrowedIsNotNullOrderByLastBorrowedAsc(int bookId);
}
