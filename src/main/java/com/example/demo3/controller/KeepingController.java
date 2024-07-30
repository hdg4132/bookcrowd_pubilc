package com.example.demo3.controller;

import com.example.demo3.dto.KeepingDTO;
import com.example.demo3.model.KeepingEntity;
import com.example.demo3.service.KeepingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/keepings")
public class KeepingController {
    @Autowired
    private KeepingService keepingService;

    @GetMapping
    public List<KeepingDTO> getAllKeepings() {
        return keepingService.getAllKeepings();
    }

    @GetMapping("/{userId}")
    public List<KeepingDTO> userGivenInfo(@PathVariable int userId) {
        return keepingService.userGivenInfo(userId);
    }

    @GetMapping("/detail/{keepingId}")
    public KeepingDTO getKeepingById(@PathVariable int keepingId) {
        return keepingService.getKeepingById(keepingId);
    }

    @PostMapping
    public KeepingDTO saveKeeping(@RequestBody KeepingDTO keepingDTO) {
        return keepingService.saveKeeping(keepingDTO);
    }

    @PutMapping("/requestReturn/{keepingId}")
    public void requestReturn(@PathVariable int keepingId) {
        keepingService.requestReturn(keepingId);
    }
    @PutMapping("/approveReturn/{keepingId}")
    public void approveReturn(@PathVariable int keepingId) {
        keepingService.approveReturn(keepingId);
    }

    @PutMapping("/matching")
    public ResponseEntity<?> Bookmatching(@RequestBody KeepingDTO keepingDTO) {
        try{
            KeepingEntity keepingEntity = KeepingDTO.toEntity(keepingDTO);
            KeepingDTO updatedKeeping = keepingService.Bookmatching(keepingEntity);
            return ResponseEntity.ok(updatedKeeping);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/bookreturn")
    public ResponseEntity<?> bookReturn(@RequestBody KeepingDTO keepingDTO) {
        try{
            KeepingEntity keepingEntity = KeepingDTO.toEntity(keepingDTO);
            KeepingDTO updatedKeeping = keepingService.Bookmatching(keepingEntity);
            return ResponseEntity.ok(updatedKeeping);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
