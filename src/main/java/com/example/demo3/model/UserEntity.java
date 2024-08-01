package com.example.demo3.model;

import com.example.demo3.dto.SignUpDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="user")			// 본인 테이블명과 맞춰주어야 함
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uuid;
    private String email;
    private String password;
    private String name;
    private String phoneNumber;
    private String userType;
    private String address;
    private String detailAddress;
    private String token;
    private LocalDateTime createdAt;
    private LocalDateTime editedAt;
    private LocalDateTime lastLoginAt;


    public UserEntity(SignUpDTO dto) {
        this.name = dto.getName();
        this.email = dto.getEmail();
        this.password = dto.getPassword();
        this.phoneNumber = dto.getPhoneNumber();
        this.userType = dto.getUserType();
        this.address = dto.getAddress();
        this.detailAddress = dto.getDetailAddress();
        this.token = "";
        this.createdAt = LocalDateTime.now();
        this.editedAt = LocalDateTime.now();
    }
}