package com.example.demo3.controller;

import com.example.demo3.dto.KeepingDTO;
import com.example.demo3.model.KeepingEntity;
import com.example.demo3.service.KeepingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/keepings")
public class KeepingController {
    @Autowired
    private KeepingService keepingService;

    @GetMapping("/admin")
    public ResponseEntity<Page<KeepingDTO>> getAllKeepings(
            @PageableDefault(sort = "keepDate", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<KeepingDTO> keepings = keepingService.getAllKeepings(pageable);
        return new ResponseEntity<>(keepings, HttpStatus.OK);
    }

    @GetMapping("/all/{userId}")
    public List<KeepingEntity> getAllKeepingsByUserId(@PathVariable Long userId) {
        return keepingService.getAllKeepingsByUserId(userId);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Page<KeepingDTO>> userGivenInfo(
            @PathVariable Long userId,
            @RequestParam(required = false) String keyword,
            @PageableDefault(sort = "keepDate", direction = Sort.Direction.DESC)  Pageable pageable) {
        Page<KeepingDTO> keepings;
        if (keyword == null || keyword.isEmpty()) {
            keepings = keepingService.userGivenInfo(userId, pageable);
        } else {
            keepings = keepingService.searchKeepingsByUser(userId, keyword, pageable);
        }
        return new ResponseEntity<>(keepings, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<KeepingEntity>> searchKeepings(
            @RequestParam(required = false) Long userId,
            @RequestParam String keyword, Pageable pageable) {
        Page<KeepingEntity> keepings = keepingService.searchKeepings(userId, keyword, pageable);
        return ResponseEntity.ok(keepings);
    }

    @GetMapping("/detail/{keepingId}")
    public ResponseEntity<KeepingDTO> getKeepingById(@PathVariable int keepingId) {
        KeepingDTO keeping = keepingService.getKeepingById(keepingId);
        return new ResponseEntity<>(keeping, HttpStatus.OK);
    }

    @GetMapping("/searchKeepingList")
    public Page<KeepingEntity> searchKeeping(@RequestParam("keyword") String keyword, Pageable pageable) {
        return keepingService.searchKeepingList(keyword, pageable);
    }

    @PostMapping
    public ResponseEntity<KeepingDTO> saveKeeping(@RequestBody KeepingDTO keepingDTO) {
        KeepingDTO savedKeeping = keepingService.saveKeeping(keepingDTO);
        return new ResponseEntity<>(savedKeeping, HttpStatus.CREATED);
    }

    @PutMapping("/updateStatus/{ISBN}")
    public ResponseEntity<?> updateKeepStatus(@PathVariable String ISBN, @RequestParam String bookName) {
        keepingService.updateKeepStatusAndQuantities(ISBN, bookName);
        return ResponseEntity.ok("KeepStatus updated");
    }

    @PutMapping("/requestReturn/{keepingId}")
    public ResponseEntity<Void> requestReturn(@PathVariable int keepingId) {
        keepingService.requestReturn(keepingId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/approveReturn/{keepingId}")
    public ResponseEntity<Void> approveReturn(@PathVariable int keepingId) {
        keepingService.approveReturn(keepingId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/status/{keepStatus}")
    public ResponseEntity<Page<KeepingDTO>> getKeepingsByStatus(
            @PathVariable int keepStatus,
            @PageableDefault(sort = "keepDate", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<KeepingDTO> keepings = keepingService.getKeepingsByStatus(keepStatus, pageable);
        return new ResponseEntity<>(keepings, HttpStatus.OK);
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
            KeepingDTO updatedKeeping = keepingService.returnedBook(keepingEntity);
            return ResponseEntity.ok(updatedKeeping);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
