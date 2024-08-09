package com.example.demo3.model;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "chat_room")
public class ChatRoomEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 증가하는 기본 키
    private Long roomId;

    // 사용자 ID
    private Long userId;

    // 관리자 ID
    private String adminId;

    // 사용자 이메일
    private String email;

    // 채팅방 생성 시간
    @Column(name = "creation_time")
    private Timestamp creationTime;

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getAdminId() {
        return adminId;
    }

    public void setAdminId(String adminId) {
        this.adminId = adminId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Timestamp getCreationTime() {
        return creationTime;
    }

    public void setCreationTime(Timestamp creationTime) {
        this.creationTime = creationTime;
    }
}
