package com.example.demo3.controller;

import com.example.demo3.dto.ChatMessageDTO;
import com.example.demo3.dto.ChatRoomDTO;
import com.example.demo3.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/sendMessage")
    public void sendMessage(ChatMessageDTO chatMessage) {
        messagingTemplate.convertAndSend("/sub/room/" + chatMessage.getRoomId(), chatMessage);
    }

    @GetMapping("/userMessages")
    public List<ChatMessageDTO> getAllUserMessages() {
        return chatService.getAllUserMessages();
    }

    @GetMapping("/adminMessages")
    public List<ChatMessageDTO> getAllAdminMessages() {
        return chatService.getAllAdminMessages();
    }

    @GetMapping("/rooms")
    public List<ChatRoomDTO> getAllChatRooms() {
        return chatService.getAllChatRooms().stream()
                .peek(room -> room.setUnread(chatService.hasUnreadMessages(room.getRoomId())))
                .collect(Collectors.toList());
    }

    @GetMapping("/rooms/{roomId}/messages")
    public List<ChatMessageDTO> getMessagesByRoomId(@PathVariable Long roomId) {
        List<ChatMessageDTO> messages = chatService.getMessagesByRoomId(roomId);
        chatService.markMessagesAsRead(roomId);
        return messages;
    }

    @PostMapping("/createRoom")
    public ChatRoomDTO createRoom(@RequestBody ChatRoomDTO chatRoomDTO) {
        return chatService.createRoom(chatRoomDTO);
    }

    @PostMapping("/messages")
    public void saveMessage(@RequestBody ChatMessageDTO chatMessageDTO) {
        chatService.saveMessage(chatMessageDTO);
    }
}