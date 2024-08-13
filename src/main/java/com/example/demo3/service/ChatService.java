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

@Service
public class ChatService {

    @Autowired
    private UserMessageRepository userMessageRepository;

    @Autowired
    private AdminMessageRepository adminMessageRepository;

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @Transactional
    public ChatMessageDTO saveMessage(ChatMessageDTO chatMessageDTO) {
        if (chatMessageDTO.getRoomId() == null) {
            throw new IllegalArgumentException("Room ID must not be null");
        }

        if (isDuplicateMessage(chatMessageDTO)) {
            return chatMessageDTO;
        }

        if ("admin".equals(chatMessageDTO.getSender())) {
            saveAdminMessage(chatMessageDTO);
        } else {
            saveUserMessage(chatMessageDTO);
        }

        return chatMessageDTO;
    }

    private boolean isDuplicateMessage(ChatMessageDTO chatMessageDTO) {
        if ("admin".equals(chatMessageDTO.getSender())) {
            List<AdminMessageEntity> existingMessages = adminMessageRepository.findByRoomId(chatMessageDTO.getRoomId());
            for (AdminMessageEntity message : existingMessages) {
                if (message.getContent().equals(chatMessageDTO.getContent()) &&
                        message.getTimestamp().equals(chatMessageDTO.getTimestamp())) {
                    return true;
                }
            }
        } else {
            List<UserMessageEntity> existingMessages = userMessageRepository.findByRoomId(chatMessageDTO.getRoomId());
            for (UserMessageEntity message : existingMessages) {
                if (message.getContent().equals(chatMessageDTO.getContent()) &&
                        message.getTimestamp().equals(chatMessageDTO.getTimestamp())) {
                    return true;
                }
            }
        }
        return false;
    }

    private void saveAdminMessage(ChatMessageDTO chatMessageDTO) {
        AdminMessageEntity adminMessageEntity = new AdminMessageEntity();
        adminMessageEntity.setRoomId(chatMessageDTO.getRoomId());
        adminMessageEntity.setAdminId(chatMessageDTO.getSender());
        adminMessageEntity.setUserId(chatMessageDTO.getUserId());
        adminMessageEntity.setEmail(chatMessageDTO.getEmail());
        adminMessageEntity.setContent(chatMessageDTO.getContent());
        adminMessageEntity.setTimestamp(convertToKST(chatMessageDTO.getTimestamp()));
        adminMessageEntity.setReadStatus(false);
        adminMessageRepository.save(adminMessageEntity);
    }

    private void saveUserMessage(ChatMessageDTO chatMessageDTO) {
        UserMessageEntity userMessageEntity = new UserMessageEntity();
        userMessageEntity.setRoomId(chatMessageDTO.getRoomId());
        userMessageEntity.setUserId(chatMessageDTO.getUserId());
        userMessageEntity.setEmail(chatMessageDTO.getEmail());
        userMessageEntity.setContent(chatMessageDTO.getContent());
        userMessageEntity.setTimestamp(convertToKST(chatMessageDTO.getTimestamp()));
        userMessageEntity.setReadStatus(false);
        userMessageRepository.save(userMessageEntity);
    }

    public List<ChatMessageDTO> getAllUserMessages() {
        return userMessageRepository.findAll().stream().map(this::convertUserEntityToDTO).collect(Collectors.toList());
    }

    public List<ChatMessageDTO> getAllAdminMessages() {
        return adminMessageRepository.findAll().stream().map(this::convertAdminEntityToDTO).collect(Collectors.toList());
    }

    public List<ChatRoomDTO> getAllChatRooms() {
        return chatRoomRepository.findAll().stream().map(this::convertRoomEntityToDTO).collect(Collectors.toList());
    }

    public ChatRoomDTO createRoom(ChatRoomDTO chatRoomDTO) {
        Optional<ChatRoomEntity> existingRoom = chatRoomRepository.findByUserId(chatRoomDTO.getUserId());

        if (existingRoom.isPresent()) {
            return convertRoomEntityToDTO(existingRoom.get());
        }

        ChatRoomEntity newRoom = new ChatRoomEntity();
        newRoom.setUserId(chatRoomDTO.getUserId());
        newRoom.setAdminId(chatRoomDTO.getAdminId());
        newRoom.setEmail(chatRoomDTO.getEmail());
        newRoom.setCreationTime(new java.sql.Timestamp(System.currentTimeMillis()));

        ChatRoomEntity savedRoom = chatRoomRepository.save(newRoom);

        return convertRoomEntityToDTO(savedRoom);
    }

    public List<ChatMessageDTO> getMessagesByRoomId(Long roomId) {
        List<ChatMessageDTO> userMessages = userMessageRepository.findByRoomId(roomId)
                .stream()
                .map(this::convertUserEntityToDTO)
                .collect(Collectors.toList());

        List<ChatMessageDTO> adminMessages = adminMessageRepository.findByRoomId(roomId)
                .stream()
                .map(this::convertAdminEntityToDTO)
                .collect(Collectors.toList());

        List<ChatMessageDTO> allMessages = userMessages;
        allMessages.addAll(adminMessages);
        allMessages.sort((m1, m2) -> m1.getTimestamp().compareTo(m2.getTimestamp()));

        markMessagesAsRead(roomId);

        return allMessages;
    }

    public boolean hasUnreadMessages(Long roomId) {
        return userMessageRepository.existsByRoomIdAndReadStatusIsFalse(roomId);
    }

    @Transactional
    public void markMessagesAsRead(Long roomId) {
        List<UserMessageEntity> userMessages = userMessageRepository.findByRoomId(roomId);
        userMessages.forEach(message -> {
            if (!message.isReadStatus()) {
                message.setReadStatus(true);
                userMessageRepository.save(message);
            }
        });
    }

    private ChatMessageDTO convertUserEntityToDTO(UserMessageEntity entity) {
        ChatMessageDTO dto = new ChatMessageDTO();
        dto.setMessageId(entity.getMessageId());
        dto.setRoomId(entity.getRoomId());
        dto.setUserId(entity.getUserId());
        dto.setEmail(entity.getEmail());
        dto.setSender("user");
        dto.setContent(entity.getContent());
        dto.setTimestamp(entity.getTimestamp());
        dto.setReadStatus(entity.isReadStatus());
        return dto;
    }

    private ChatMessageDTO convertAdminEntityToDTO(AdminMessageEntity entity) {
        ChatMessageDTO dto = new ChatMessageDTO();
        dto.setMessageId(entity.getMessageId());
        dto.setRoomId(entity.getRoomId());
        dto.setUserId(entity.getUserId());
        dto.setEmail(entity.getEmail());
        dto.setSender("admin");
        dto.setContent(entity.getContent());
        dto.setTimestamp(entity.getTimestamp());
        dto.setReadStatus(entity.isReadStatus());
        return dto;
    }

    private ChatRoomDTO convertRoomEntityToDTO(ChatRoomEntity entity) {
        ChatRoomDTO dto = new ChatRoomDTO();
        dto.setRoomId(entity.getRoomId());
        dto.setUserId(entity.getUserId());
        dto.setAdminId(entity.getAdminId());
        dto.setEmail(entity.getEmail());
        dto.setCreationTime(entity.getCreationTime());

        boolean unread = hasUnreadMessages(entity.getRoomId());
        dto.setUnread(unread);

        Optional<ChatMessageDTO> latestMessage = getLatestMessageByRoomId(entity.getRoomId());
        latestMessage.ifPresent(message -> dto.setLatestMessage(message.getContent()));

        return dto;
    }

    // 추가: 특정 채팅방의 최신 메시지를 가져오는 메서드
    private Optional<ChatMessageDTO> getLatestMessageByRoomId(Long roomId) {
        List<ChatMessageDTO> userMessages = userMessageRepository.findByRoomId(roomId)
                .stream()
                .map(this::convertUserEntityToDTO)
                .collect(Collectors.toList());

        List<ChatMessageDTO> adminMessages = adminMessageRepository.findByRoomId(roomId)
                .stream()
                .map(this::convertAdminEntityToDTO)
                .collect(Collectors.toList());

        List<ChatMessageDTO> allMessages = userMessages;
        allMessages.addAll(adminMessages);
        return allMessages.stream()
                .max((m1, m2) -> m1.getTimestamp().compareTo(m2.getTimestamp()));
    }

    private java.util.Date convertToKST(java.util.Date date) {
        return java.util.Date.from(date.toInstant().atZone(ZoneId.of("Asia/Seoul")).toInstant());
    }
    // 0813 추가
    // 특정 사용자와 관련된 모든 채팅방과 메시지를 삭제
    @Transactional
    public void deleteChatDataByUserId(Long userId) {
        // 사용자의 모든 채팅방 가져오기
        Optional<ChatRoomEntity> chatRoomOptional = chatRoomRepository.findByUserId(userId);

        // 채팅방이 존재할 경우 삭제 작업 수행
        chatRoomOptional.ifPresent(chatRoom -> {
            // 채팅방 ID로 관련 메시지 삭제
            Long roomId = chatRoom.getRoomId();
            userMessageRepository.deleteByRoomId(roomId);
            adminMessageRepository.deleteByRoomId(roomId);

            // 채팅방 삭제
            chatRoomRepository.delete(chatRoom);
        });

        if (!chatRoomOptional.isPresent()) {
            System.out.println("No chat room found for user ID: " + userId);
        }
    }
}

