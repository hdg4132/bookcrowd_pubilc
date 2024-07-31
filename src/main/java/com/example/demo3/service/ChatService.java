package com.example.demo3.service;

import com.example.demo3.dto.ChatMessage;
import com.example.demo3.dto.ChatRoom;
import com.example.demo3.persistence.AdminMessageRepository;
import com.example.demo3.persistence.ChatRoomRepository;
import com.example.demo3.persistence.UserMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    @Autowired
    private UserMessageRepository userMessageRepository;

    @Autowired
    private AdminMessageRepository adminMessageRepository;

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    public ChatMessage saveMessage(ChatMessage chatMessage) {
        if (chatMessage.getSender().equals("admin")) {
            return adminMessageRepository.save(chatMessage);
        } else {
            return userMessageRepository.save(chatMessage);
        }
    }

    public List<ChatMessage> getAllMessages() {
        return adminMessageRepository.findAll();
    }

    public List<ChatRoom> getAllChatRooms() {
        return chatRoomRepository.findAll();
    }
}