package com.example.demo3.persistence;

import com.example.demo3.model.UserMessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

// 사용자 메시지 저장소 인터페이스
@Repository
public interface UserMessageRepository extends JpaRepository<UserMessageEntity, Long> {
    
    // 특정 채팅방의 사용자 메시지를 검색하는 메서드
    List<UserMessageEntity> findByRoomId(Long roomId);

    // 특정 채팅방에 읽지 않은 메시지가 있는지 확인하는 메서드
    boolean existsByRoomIdAndReadStatusIsFalse(Long roomId);
    // 0813 추가
    void deleteByRoomId(Long roomId);
}
