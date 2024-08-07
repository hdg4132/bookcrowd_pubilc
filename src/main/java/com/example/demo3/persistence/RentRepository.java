package com.example.demo3.persistence;

import com.example.demo3.model.RentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RentRepository extends JpaRepository<RentEntity, Integer> {
    List<RentEntity> findByBorrowedId(Long borrowedId);
    List<RentEntity> findByBorrowedIdAndApproval(Long borrowedId, String approval);
    List<RentEntity> findByApproval(String approval);
    List<RentEntity> findByIsbn(String isbn);
    List<RentEntity> findByRentId(Integer rentId);
    int countByborrowedIdAndApproval(Long borrowedId, String approval);
}
