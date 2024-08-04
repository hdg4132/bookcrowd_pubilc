package com.example.demo3.persistence;

import com.example.demo3.model.UserMessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMessageRepository extends JpaRepository<UserMessageEntity, Long> {
    List<UserMessageEntity> findByRoomId(Long roomId);
}