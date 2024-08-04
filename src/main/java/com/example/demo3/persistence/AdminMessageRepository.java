package com.example.demo3.persistence;

import com.example.demo3.model.AdminMessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminMessageRepository extends JpaRepository<AdminMessageEntity, Long> {
    List<AdminMessageEntity> findByRoomId(Long roomId);
}