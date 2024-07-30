package com.example.demo3.persistence;

import com.example.demo3.model.KeepingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KeepingRepository extends JpaRepository <KeepingEntity, Integer> {
    List<KeepingEntity> findByUserId(int userId);
    List<KeepingEntity> findByISBN(String ISBN);
    List<KeepingEntity> findByISBNAndRentableAndKeepStatus(String ISBN, boolean rentable, int keepStatus);
}
