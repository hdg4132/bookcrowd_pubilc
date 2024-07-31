package com.example.demo3.dto;

public class DeleteAccountRequestDTO {

    private String email;
    private String password;

    // 기본 생성자
    public DeleteAccountRequestDTO() {}

    // 생성자
    public DeleteAccountRequestDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // Getter 및 Setter
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
