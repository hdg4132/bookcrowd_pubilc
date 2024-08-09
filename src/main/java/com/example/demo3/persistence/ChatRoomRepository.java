package com.example.demo3.persistence;

import com.example.demo3.model.ChatRoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

// 채팅방 저장소 인터페이스
@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoomEntity, Long> {
    
    // 특정 사용자 ID로 채팅방을 검색하는 메서드
    Optional<ChatRoomEntity> findByUserId(Long userId);
}
