package com.example.demo3.persistence;

import com.example.demo3.dto.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMessageRepository extends JpaRepository<ChatMessage, Long> {
}