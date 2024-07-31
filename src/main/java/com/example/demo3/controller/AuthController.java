package com.example.demo3.controller;

import com.example.demo3.dto.*;
import com.example.demo3.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/signUp")
    public ResponseDTO<?> signUp(@RequestBody SignUpDTO requestBody) {
        return authService.signUp(requestBody);
    }

    @PostMapping("/login")
    public ResponseDTO<?> login(@RequestBody LoginDTO requestBody) {
        return authService.login(requestBody);
    }

    @PostMapping("/editprofile")
    public ResponseDTO<?> updateProfile(@RequestBody UpdateProfileDTO dto) {
        return authService.updateProfile(dto);
    }

    @PostMapping("/deleteAccount")
    public ResponseEntity<ResponseDTO<?>> deleteAccount(@RequestBody DeleteAccountRequestDTO requestBody) {
        ResponseDTO<?> result = authService.deleteAccount(requestBody);
        return ResponseEntity.ok(result);
    }
}
