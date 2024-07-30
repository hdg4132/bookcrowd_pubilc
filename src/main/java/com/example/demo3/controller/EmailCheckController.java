package com.example.demo3.controller;

import com.example.demo3.dto.EmailCheckDto;
import com.example.demo3.dto.ResponseDTO;
import com.example.demo3.service.EmailCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class EmailCheckController {

    @Autowired
    private EmailCheckService emailCheckService;

    @PostMapping("/checkEmailDuplication")
    public ResponseDTO<?> checkEmailDuplication(@RequestBody EmailCheckDto emailCheckDto) {
        boolean isDuplicated = emailCheckService.isEmailDuplicated(emailCheckDto.getEmail());

        if (isDuplicated) {
            return ResponseDTO.setFailed("중복된 이메일입니다.");
        } else {
            boolean exists = false;
            return ResponseDTO.setPass(exists, "사용 가능한 이메일입니다.");
        }
    }
}
