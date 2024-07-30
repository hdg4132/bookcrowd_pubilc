package com.example.demo3.persistence;

import com.example.demo3.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository <UserEntity, String> {
    public boolean existsByEmailAndPassword(String email, String password);

    public boolean existsByEmail(String email);
}
