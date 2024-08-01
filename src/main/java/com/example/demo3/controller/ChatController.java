package com.example.demo3.controller;

import com.example.demo3.dto.ChatMessageDTO;
import com.example.demo3.dto.ChatRoomDTO;
import com.example.demo3.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/sendMessage")
    public void sendMessage(ChatMessageDTO chatMessage) {
        chatMessage.setTimestamp(new java.util.Date());
        ChatMessageDTO savedMessage = chatService.saveMessage(chatMessage);

        messagingTemplate.convertAndSend("/sub/room/" + chatMessage.getRoomId(), savedMessage);
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
        return chatService.getAllChatRooms();
    }

    @PostMapping("/createRoom")
    public ChatRoomDTO createRoom(@RequestBody ChatRoomDTO chatRoomDTO) {
        return chatService.createRoom(chatRoomDTO);
    }
}