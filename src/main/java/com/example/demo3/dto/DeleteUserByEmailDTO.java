package com.example.demo3.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DeleteUserByEmailDTO {

    // Getter 및 Setter
    private String email;
    private String password;

    // 생성자
    public DeleteUserByEmailDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }

}
