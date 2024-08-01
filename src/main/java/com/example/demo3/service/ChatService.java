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

    public ChatMessageDTO saveMessage(ChatMessageDTO chatMessageDTO) {
        if ("admin".equals(chatMessageDTO.getSender())) {
            AdminMessageEntity adminMessageEntity = new AdminMessageEntity();
            adminMessageEntity.setRoomId(chatMessageDTO.getRoomId());
            adminMessageEntity.setAdminId(chatMessageDTO.getSender());
            adminMessageEntity.setContent(chatMessageDTO.getContent());
            adminMessageEntity.setTimestamp(chatMessageDTO.getTimestamp());
            adminMessageEntity.setUserId(chatMessageDTO.getUserId());
            adminMessageRepository.save(adminMessageEntity);
        } else {
            UserMessageEntity userMessageEntity = new UserMessageEntity();
            userMessageEntity.setRoomId(chatMessageDTO.getRoomId());
            userMessageEntity.setUserId(chatMessageDTO.getUserId());
            userMessageEntity.setContent(chatMessageDTO.getContent());
            userMessageEntity.setTimestamp(chatMessageDTO.getTimestamp());
            userMessageRepository.save(userMessageEntity);
        }

        return chatMessageDTO;
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

        ChatRoomEntity chatRoomEntity = existingRoom.orElseGet(() -> {
            ChatRoomEntity newRoom = new ChatRoomEntity();
            newRoom.setUserId(chatRoomDTO.getUserId());
            newRoom.setAdminId(chatRoomDTO.getAdminId());
            newRoom.setCreationTime(new java.sql.Timestamp(System.currentTimeMillis()));
            return chatRoomRepository.save(newRoom);
        });

        return convertRoomEntityToDTO(chatRoomEntity);
    }

    private ChatMessageDTO convertUserEntityToDTO(UserMessageEntity entity) {
        ChatMessageDTO dto = new ChatMessageDTO();
        dto.setMessageId(entity.getMessageId());
        dto.setRoomId(entity.getRoomId());
        dto.setUserId(entity.getUserId());
        dto.setSender("user");
        dto.setContent(entity.getContent());
        dto.setTimestamp(entity.getTimestamp());
        return dto;
    }

    private ChatMessageDTO convertAdminEntityToDTO(AdminMessageEntity entity) {
        ChatMessageDTO dto = new ChatMessageDTO();
        dto.setMessageId(entity.getMessageId());
        dto.setRoomId(entity.getRoomId());
        dto.setUserId(entity.getUserId());
        dto.setSender("admin");
        dto.setContent(entity.getContent());
        dto.setTimestamp(entity.getTimestamp());
        return dto;
    }

    private ChatRoomDTO convertRoomEntityToDTO(ChatRoomEntity entity) {
        ChatRoomDTO dto = new ChatRoomDTO();
        dto.setRoomId(entity.getRoomId());
        dto.setUserId(entity.getUserId());
        dto.setAdminId(entity.getAdminId());
        dto.setCreationTime(entity.getCreationTime());
        return dto;
    }
}