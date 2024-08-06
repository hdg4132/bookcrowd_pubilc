package com.example.demo3.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "admin_message")
public class AdminMessageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 증가하는 기본 키
    private Long messageId;

    // 채팅방 ID
    private Long roomId;

    // 관리자 ID
    private String adminId;

    // 사용자 ID
    private Long userId;

    // 사용자 이메일
    private String email;

    // 메시지 내용
    private String content;

    // 메시지 전송 시각
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;

    // 읽음 상태
    private boolean readStatus;

    public Long getMessageId() {
        return messageId;
    }

    public void setMessageId(Long messageId) {
        this.messageId = messageId;
    }

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public String getAdminId() {
        return adminId;
    }

    public void setAdminId(String adminId) {
        this.adminId = adminId;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isReadStatus() {
        return readStatus;
    }

    public void setReadStatus(boolean readStatus) {
        this.readStatus = readStatus;
    }
}
