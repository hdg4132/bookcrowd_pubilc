package com.example.demo3.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDTO {
    private String name;
    private String email;
    private String password;
    private String confirmPassword;
    private String phoneNumber;
    private String userType;
    private String address;
    private String detailAddress;
}
