package com.example.demo3.controller;

import com.example.demo3.dto.KeepingDTO;
import com.example.demo3.dto.RentDTO;
import com.example.demo3.model.RentEntity;
import com.example.demo3.service.KeepingService;
import com.example.demo3.service.RentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/rents")
@RequiredArgsConstructor
public class RentController {
    @Autowired
    private RentService rentService;
    private final KeepingService keepingService;

    @GetMapping("/all")
    public List<RentDTO> getAllRents() {
        return rentService.getAllRentList();
    }

    @PostMapping("/register")
    public RentDTO saveRent(@RequestBody RentDTO rentDTO) {
        return rentService.saveRent(rentDTO);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateRent(@RequestBody RentDTO rentDTO) {
        try {
            RentEntity entity = RentDTO.toEntity(rentDTO);
            RentDTO updatedRent = rentService.updateRent(entity);
            return ResponseEntity.ok(updatedRent);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/approval")
    public ResponseEntity<?> updateAprroval(@RequestBody RentDTO rentDTO) {
        try {
            RentEntity entity = RentDTO.toEntity(rentDTO);
            RentDTO updatedRent = rentService.updateRentApproval(entity);
            return ResponseEntity.ok(updatedRent);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/approval/{approval}")
    public List<RentDTO> findByApproval(@PathVariable String approval) {
        return rentService.findByapproval(approval);
    }

    @GetMapping("/rentapproval/{rentId}/{isbn}")
    public ResponseEntity<Map<String, Object>> findByisbnwithKeeping(@PathVariable String isbn,@PathVariable Integer rentId) {
        List<RentDTO> rentDTO = rentService.findById(rentId);
        List<KeepingDTO> keepingDTO = keepingService.findByISBN(isbn);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("rentDTO", rentDTO);
        responseData.put("keepingDTO", keepingDTO);

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PutMapping("/matching")
    public ResponseEntity<?> RentBookMatching(@RequestBody RentDTO rentDTO) {
        try {
            RentEntity entity = RentDTO.toEntity(rentDTO);
            RentDTO BookMatching = rentService.bookmatching(entity);
            return ResponseEntity.ok(BookMatching);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/bookreturn")
    public ResponseEntity<?> BookReturn(@RequestBody RentDTO rentDTO){
        try {
            RentEntity entity = RentDTO.toEntity(rentDTO);
            RentDTO BookReturn = rentService.updateRentReturn(entity);
            return ResponseEntity.ok(BookReturn);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/rentlist/{userId}")
    public List<RentDTO> findByUserId(@PathVariable Long userId) {
        return rentService.findByBorrowedId(userId);
    }
}


