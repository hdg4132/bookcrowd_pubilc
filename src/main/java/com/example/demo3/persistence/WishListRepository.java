package com.example.demo3.persistence;

import com.example.demo3.model.WishListEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishListRepository extends JpaRepository<WishListEntity, Integer> {
    List<WishListEntity> findByUserId(Long userId);
    boolean existsByUserIdAndIsbn(Long userId, String isbn);

    @Transactional
    void deleteByUserIdAndIsbn(Long userId, String isbn);
}
