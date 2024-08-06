package com.example.demo3.service;

import com.example.demo3.dto.ChatMessageDTO;
import com.example.demo3.dto.ChatRoomDTO;
import com.example.demo3.model.ChatRoomEntity;
import com.example.demo3.model.UserMessageEntity;
import com.example.demo3.model.AdminMessageEntity;
import com.example.demo3.persistence.AdminMessageRepository;
import com.example.demo3.persistence.ChatRoomRepository;
import com.example.demo3.persistence.UserMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

// ChatService 클래스 정의
@Service
public class ChatService {

    @Autowired
    private UserMessageRepository userMessageRepository;

    @Autowired
    private AdminMessageRepository adminMessageRepository;

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    // 메시지 저장 메서드
    @Transactional
    public ChatMessageDTO saveMessage(ChatMessageDTO chatMessageDTO) {
        if (chatMessageDTO.getRoomId() == null) {
            throw new IllegalArgumentException("Room ID must not be null");
        }

        // 중복 메시지 확인
        if (isDuplicateMessage(chatMessageDTO)) {
            return chatMessageDTO; // 중복 메시지인 경우 저장하지 않고 반환
        }

        // 메시지를 저장합니다.
        if ("admin".equals(chatMessageDTO.getSender())) {
            saveAdminMessage(chatMessageDTO);
        } else {
            saveUserMessage(chatMessageDTO);
        }

        return chatMessageDTO;
    }

    // 중복 메시지 확인 메서드
    private boolean isDuplicateMessage(ChatMessageDTO chatMessageDTO) {
        if ("admin".equals(chatMessageDTO.getSender())) {
            List<AdminMessageEntity> existingMessages = adminMessageRepository.findByRoomId(chatMessageDTO.getRoomId());
            for (AdminMessageEntity message : existingMessages) {
                if (message.getContent().equals(chatMessageDTO.getContent()) &&
                    message.getTimestamp().equals(chatMessageDTO.getTimestamp())) {
                    return true; // 동일한 내용과 시간이 있으면 중복으로 간주
                }
            }
        } else {
            List<UserMessageEntity> existingMessages = userMessageRepository.findByRoomId(chatMessageDTO.getRoomId());
            for (UserMessageEntity message : existingMessages) {
                if (message.getContent().equals(chatMessageDTO.getContent()) &&
                    message.getTimestamp().equals(chatMessageDTO.getTimestamp())) {
                    return true; // 동일한 내용과 시간이 있으면 중복으로 간주
                }
            }
        }
        return false; // 중복이 아닌 경우
    }

    // 관리자 메시지 저장 메서드
    private void saveAdminMessage(ChatMessageDTO chatMessageDTO) {
        AdminMessageEntity adminMessageEntity = new AdminMessageEntity();
        adminMessageEntity.setRoomId(chatMessageDTO.getRoomId());
        adminMessageEntity.setAdminId(chatMessageDTO.getSender());
        adminMessageEntity.setUserId(chatMessageDTO.getUserId()); // 사용자 ID 설정
        adminMessageEntity.setEmail(chatMessageDTO.getEmail()); // 이메일 설정
        adminMessageEntity.setContent(chatMessageDTO.getContent());
        adminMessageEntity.setTimestamp(convertToKST(chatMessageDTO.getTimestamp())); // 시간대 변환
        adminMessageEntity.setReadStatus(false); // 메시지 저장 시 읽지 않음으로 설정
        adminMessageRepository.save(adminMessageEntity);
    }

    // 사용자 메시지 저장 메서드
    private void saveUserMessage(ChatMessageDTO chatMessageDTO) {
        UserMessageEntity userMessageEntity = new UserMessageEntity();
        userMessageEntity.setRoomId(chatMessageDTO.getRoomId());
        userMessageEntity.setUserId(chatMessageDTO.getUserId());
        userMessageEntity.setEmail(chatMessageDTO.getEmail()); // 이메일 설정
        userMessageEntity.setContent(chatMessageDTO.getContent());
        userMessageEntity.setTimestamp(convertToKST(chatMessageDTO.getTimestamp())); // 시간대 변환
        userMessageEntity.setReadStatus(false); // 메시지 저장 시 읽지 않음으로 설정
        userMessageRepository.save(userMessageEntity);
    }

    // 모든 사용자 메시지를 가져오는 메서드
    public List<ChatMessageDTO> getAllUserMessages() {
        return userMessageRepository.findAll().stream().map(this::convertUserEntityToDTO).collect(Collectors.toList());
    }

    // 모든 관리자 메시지를 가져오는 메서드
    public List<ChatMessageDTO> getAllAdminMessages() {
        return adminMessageRepository.findAll().stream().map(this::convertAdminEntityToDTO).collect(Collectors.toList());
    }

    // 모든 채팅방을 가져오는 메서드
    public List<ChatRoomDTO> getAllChatRooms() {
        return chatRoomRepository.findAll().stream().map(this::convertRoomEntityToDTO).collect(Collectors.toList());
    }

    // 새로운 채팅방을 생성하는 메서드
    public ChatRoomDTO createRoom(ChatRoomDTO chatRoomDTO) {
        Optional<ChatRoomEntity> existingRoom = chatRoomRepository.findByUserId(chatRoomDTO.getUserId());

        ChatRoomEntity chatRoomEntity = existingRoom.orElseGet(() -> {
            ChatRoomEntity newRoom = new ChatRoomEntity();
            newRoom.setUserId(chatRoomDTO.getUserId());
            newRoom.setAdminId(chatRoomDTO.getAdminId());
            newRoom.setEmail(chatRoomDTO.getEmail());
            newRoom.setCreationTime(new java.sql.Timestamp(System.currentTimeMillis()));
            return chatRoomRepository.save(newRoom);
        });

        return convertRoomEntityToDTO(chatRoomEntity);
    }

    // 특정 채팅방의 메시지 가져오기
    public List<ChatMessageDTO> getMessagesByRoomId(Long roomId) {
        List<ChatMessageDTO> userMessages = userMessageRepository.findByRoomId(roomId)
                .stream()
                .map(this::convertUserEntityToDTO)
                .collect(Collectors.toList());

        List<ChatMessageDTO> adminMessages = adminMessageRepository.findByRoomId(roomId)
                .stream()
                .map(this::convertAdminEntityToDTO)
                .collect(Collectors.toList());

        // 두 메시지 목록을 합치고 정렬
        List<ChatMessageDTO> allMessages = userMessages;
        allMessages.addAll(adminMessages);
        allMessages.sort((m1, m2) -> m1.getTimestamp().compareTo(m2.getTimestamp()));

        // 메시지를 읽음으로 변경
        markMessagesAsRead(roomId);

        return allMessages;
    }

    // 특정 채팅방에 읽지 않은 메시지가 있는지 확인하는 메서드
    public boolean hasUnreadMessages(Long roomId) {
        return userMessageRepository.existsByRoomIdAndReadStatusIsFalse(roomId);
    }

    // 메시지를 읽음으로 변경
    @Transactional
    public void markMessagesAsRead(Long roomId) {
        List<UserMessageEntity> userMessages = userMessageRepository.findByRoomId(roomId);
        userMessages.forEach(message -> {
            if (!message.isReadStatus()) { // 읽지 않은 메시지에 대해서만 업데이트
                message.setReadStatus(true);
                userMessageRepository.save(message);
            }
        });
    }

    // 사용자 엔티티를 DTO로 변환하는 메서드
    private ChatMessageDTO convertUserEntityToDTO(UserMessageEntity entity) {
        ChatMessageDTO dto = new ChatMessageDTO();
        dto.setMessageId(entity.getMessageId());
        dto.setRoomId(entity.getRoomId());
        dto.setUserId(entity.getUserId());
        dto.setEmail(entity.getEmail());
        dto.setSender("user");
        dto.setContent(entity.getContent());
        dto.setTimestamp(entity.getTimestamp());
        dto.setReadStatus(entity.isReadStatus()); // DTO에 읽기 상태 추가
        return dto;
    }

    // 관리자 엔티티를 DTO로 변환하는 메서드
    private ChatMessageDTO convertAdminEntityToDTO(AdminMessageEntity entity) {
        ChatMessageDTO dto = new ChatMessageDTO();
        dto.setMessageId(entity.getMessageId());
        dto.setRoomId(entity.getRoomId());
        dto.setUserId(entity.getUserId());
        dto.setEmail(entity.getEmail());
        dto.setSender("admin");
        dto.setContent(entity.getContent());
        dto.setTimestamp(entity.getTimestamp());
        dto.setReadStatus(entity.isReadStatus()); // DTO에 읽기 상태 추가
        return dto;
    }

    // 채팅방 엔티티를 DTO로 변환하는 메서드
    private ChatRoomDTO convertRoomEntityToDTO(ChatRoomEntity entity) {
        ChatRoomDTO dto = new ChatRoomDTO();
        dto.setRoomId(entity.getRoomId());
        dto.setUserId(entity.getUserId());
        dto.setAdminId(entity.getAdminId());
        dto.setEmail(entity.getEmail());
        dto.setCreationTime(entity.getCreationTime());

        // 해당 채팅방에 읽지 않은 메시지가 있는지 확인
        boolean unread = hasUnreadMessages(entity.getRoomId());
        dto.setUnread(unread);

        return dto;
    }

    // KST로 시간 변환
    private java.util.Date convertToKST(java.util.Date date) {
        return java.util.Date.from(date.toInstant().atZone(ZoneId.of("Asia/Seoul")).toInstant());
    }
}
