package com.example.demo3.controller;

import com.example.demo3.dto.ChatMessage;
import com.example.demo3.dto.ChatRoom;
import com.example.demo3.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @MessageMapping("/sendMessage")
    @SendTo("/sub/room")
    public ChatMessage sendMessage(ChatMessage chatMessage) {
        chatMessage.setTimestamp(new java.util.Date());
        return chatService.saveMessage(chatMessage);
    }

    @GetMapping("/messages")
    @ResponseBody
    public List<ChatMessage> getAllMessages() {
        return chatService.getAllMessages();
    }

    @GetMapping("/rooms")
    @ResponseBody
    public List<ChatRoom> getAllChatRooms() {
        return chatService.getAllChatRooms();
    }
}