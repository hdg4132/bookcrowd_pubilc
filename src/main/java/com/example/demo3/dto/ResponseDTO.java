package com.example.demo3.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor(staticName = "set")
public class ResponseDTO<D> {
    private boolean result;
    private String message;
    private D data;

    public  static <D> ResponseDTO<D> setSuccess(String message) {
        return ResponseDTO.set(true, message, null);
    }

    public  static <D> ResponseDTO<D> setPass(boolean exists, String message) {
        return ResponseDTO.set(true, message, null);
    }

    public static <D> ResponseDTO<D> setFailed(String message)
    {
        return ResponseDTO.set(false, message, null);
    }

    public static <D> ResponseDTO<D> setSuccessData(String message, D data) {
        return ResponseDTO.set(true, message, data);
    }

    public static <D> ResponseDTO<D> setFailedData(String message, D data) {
        return ResponseDTO.set(false, message, data);
    }
}