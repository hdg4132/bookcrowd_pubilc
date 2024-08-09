package com.example.demo3.controller;

import com.example.demo3.dto.RentDTO;
import com.example.demo3.service.PaginationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rents")
public class PaginationController {

    @Autowired
    private PaginationService paginationService;

    @GetMapping("/rentlist/{borrowedId}")
    public ResponseEntity<Page<RentDTO>> findByBorrowedId(
            @PathVariable Long borrowedId,
            @RequestParam int page,
            @RequestParam int size) {
        Page<RentDTO> rentPage = paginationService.findByBorrowedId(borrowedId, page);
        return ResponseEntity.ok(rentPage);
    }
}
