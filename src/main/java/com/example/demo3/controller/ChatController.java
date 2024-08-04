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
        // 메시지를 클라이언트에 전송
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
        return chatService.getAllChatRooms();
    }

    // 특정 채팅방의 메시지 가져오기
    @GetMapping("/rooms/{roomId}/messages")
    public List<ChatMessageDTO> getMessagesByRoomId(@PathVariable Long roomId) {
        return chatService.getMessagesByRoomId(roomId);
    }

    @PostMapping("/createRoom")
    public ChatRoomDTO createRoom(@RequestBody ChatRoomDTO chatRoomDTO) {
        return chatService.createRoom(chatRoomDTO);
    }

    // 메시지 저장 엔드포인트
    @PostMapping("/messages")
    public void saveMessage(@RequestBody ChatMessageDTO chatMessageDTO) {
        chatService.saveMessage(chatMessageDTO);
    }
}
