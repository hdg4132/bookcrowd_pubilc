package com.example.demo3.persistence;

import com.example.demo3.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
    static boolean existsByEmail(String email) {
        return false;
    }

    Optional<UserEntity> findByEmail(String email); // 수정: Optional 반환
}
