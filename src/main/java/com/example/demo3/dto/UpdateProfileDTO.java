package com.example.demo3.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UpdateProfileDTO {
    // Getters and setters
    private String id;
    private String userName;
    private String email;
    private String password;
    private String phoneNumber;
    private String address;
    private String detailAddress;

}
