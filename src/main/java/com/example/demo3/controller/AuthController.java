package com.example.demo3.controller;

import com.example.demo3.dto.*;
import com.example.demo3.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @PutMapping("/editprofile")
    public ResponseDTO<?> updateProfile(@RequestBody UpdateProfileDTO dto) {
        return authService.updateProfile(dto);
    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate(); // 세션 무효화
        }
        return "로그아웃 완료";
    }

    @DeleteMapping("/deleteAccount")
    public ResponseEntity<String> deleteAccount(@RequestParam String email) {
        boolean success = authService.deleteUserByEmail(email);
        if (success) {
            return ResponseEntity.ok("회원정보 삭제 완료");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("존재하지 않는 유저");
        }
    }
}
