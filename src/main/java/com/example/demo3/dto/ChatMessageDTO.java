package com.example.demo3.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;

public class ChatMessageDTO {
    // 메시지 ID
    private Long messageId;

    // 채팅방 ID
    private Long roomId;

    // 사용자 ID
    private Long userId;

    // 사용자 이메일
    private String email;

    // 발신자 (admin 또는 user)
    private String sender;

    // 메시지 내용
    private String content;

    // 읽음 상태를 추적하는 새로운 필드
    private boolean readStatus;

    // 메시지 전송 시각 (JSON 형식 설정)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", timezone = "UTC")
    private Date timestamp;

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

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
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