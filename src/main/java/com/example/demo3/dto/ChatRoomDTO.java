package com.example.demo3.dto;

import java.sql.Timestamp;

public class ChatRoomDTO {
    // 채팅방 ID
    private Long roomId;

    // 사용자 ID
    private Long userId;

    // 사용자 이메일
    private String email;

    // 관리자 ID
    private String adminId;

    // 채팅방 생성 시간
    private Timestamp creationTime;

    // 읽지 않은 메시지 여부를 나타내는 필드
    private boolean unread;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAdminId() {
        return adminId;
    }

    public void setAdminId(String adminId) {
        this.adminId = adminId;
    }

    public Timestamp getCreationTime() {
        return creationTime;
    }

    public void setCreationTime(Timestamp creationTime) {
        this.creationTime = creationTime;
    }

    public boolean isUnread() {
        return unread;
    }

    public void setUnread(boolean unread) {
        this.unread = unread;
    }
}
