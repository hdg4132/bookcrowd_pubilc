package com.example.demo3.persistence;

import com.example.demo3.model.RentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaginationRepository extends JpaRepository<RentEntity, Long> {
    Page<RentEntity> findByBorrowedId(Long borrowedId, Pageable pageable);
}
