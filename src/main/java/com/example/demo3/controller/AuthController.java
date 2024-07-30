package com.example.demo3.controller;

import com.example.demo3.dto.LoginDTO;
import com.example.demo3.dto.LoginResponseDTO;
import com.example.demo3.dto.ResponseDTO;
import com.example.demo3.dto.SignUpDTO;
import com.example.demo3.model.UserEntity;
import com.example.demo3.persistence.UserRepository;
import com.example.demo3.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired AuthService authService;
    @Autowired UserRepository userRepository;

    @PostMapping("/signUp")
    public ResponseDTO<?> signUp(@RequestBody SignUpDTO requestBody) {
        ResponseDTO<?> result = authService.signUp(requestBody);
        return result;
    }

    @PostMapping("/login")
    public ResponseDTO<?> login(@RequestBody LoginDTO requestBody) {
        ResponseDTO<?> result = authService.login(requestBody);
        return result;
    }

}