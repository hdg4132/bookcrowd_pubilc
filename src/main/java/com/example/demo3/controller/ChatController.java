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

    // STOMP를 통해 메시지를 전송
    @MessageMapping("/sendMessage")
    public void sendMessage(ChatMessageDTO chatMessage) {
        // 메시지를 클라이언트에 전송
        messagingTemplate.convertAndSend("/sub/room/" + chatMessage.getRoomId(), chatMessage);
    }

    // 모든 사용자 메시지를 가져옴
    @GetMapping("/userMessages")
    public List<ChatMessageDTO> getAllUserMessages() {
        return chatService.getAllUserMessages();
    }

    // 모든 관리자 메시지를 가져옴
    @GetMapping("/adminMessages")
    public List<ChatMessageDTO> getAllAdminMessages() {
        return chatService.getAllAdminMessages();
    }

    // 모든 채팅방을 가져옴
    @GetMapping("/rooms")
    public List<ChatRoomDTO> getAllChatRooms() {
        return chatService.getAllChatRooms().stream()
                .peek(room -> room.setUnread(chatService.hasUnreadMessages(room.getRoomId()))) // 각 채팅방의 읽음 상태를 설정
                .collect(Collectors.toList());
    }

    // 특정 채팅방의 메시지 가져오기
    @GetMapping("/rooms/{roomId}/messages")
    public List<ChatMessageDTO> getMessagesByRoomId(@PathVariable Long roomId) {
        List<ChatMessageDTO> messages = chatService.getMessagesByRoomId(roomId);

        // 메시지를 읽음 상태로 변경
        chatService.markMessagesAsRead(roomId);

        return messages;
    }

    // 새로운 채팅방을 생성함
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
