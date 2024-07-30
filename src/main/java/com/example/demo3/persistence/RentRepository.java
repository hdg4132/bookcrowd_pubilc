package com.example.demo3.persistence;

import com.example.demo3.model.RentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RentRepository extends JpaRepository<RentEntity, Integer> {
    List<RentEntity> findByBorrowedId(Integer borrowedId);
    List<RentEntity> findByApproval(String approval);
    List<RentEntity> findByISBN(String ISBN);
    List<RentEntity> findByRentId(Integer rentId);
    Long countByborrowedId(int borrowedId);
}
