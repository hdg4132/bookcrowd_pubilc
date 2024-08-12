package com.example.demo3.persistence;

import com.example.demo3.model.AdminMessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// 관리자 메시지 저장소 인터페이스
@Repository
public interface AdminMessageRepository extends JpaRepository<AdminMessageEntity, Long> {
    
    // 특정 채팅방의 관리자 메시지를 검색하는 메서드
    List<AdminMessageEntity> findByRoomId(Long roomId);
    // 0813 추가
    void deleteByRoomId(Long roomId);
}
