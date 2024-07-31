package com.example.demo3.controller;

import com.example.demo3.dto.EmailCheckDto;
import com.example.demo3.dto.ResponseDTO;
import com.example.demo3.persistence.UserRepository;
import com.example.demo3.service.EmailCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class EmailCheckController {

    @Autowired
    private EmailCheckService emailCheckService;

    @PostMapping("/checkEmailDuplication")
    public ResponseDTO<?> checkEmailDuplication(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        boolean isDuplicate = UserRepository.existsByEmail(email);
        if (isDuplicate) {
            return ResponseDTO.setFailed("이미 존재하는 이메일입니다.");
        } else {
            return ResponseDTO.setSuccess("사용 가능한 이메일입니다.");
        }
    }
}
