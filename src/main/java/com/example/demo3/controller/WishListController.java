package com.example.demo3.controller;

import com.example.demo3.dto.WishListDTO;
import com.example.demo3.service.WishListService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wishlist")
@RequiredArgsConstructor
public class WishListController {
    @Autowired
    WishListService wishListService;

    @GetMapping("/all")
    public List<WishListDTO> getAllRents() { return wishListService.getAllwishList(); }

    @GetMapping("/{userId}")
    public List<WishListDTO> getByUserId(@PathVariable Long userId) { return wishListService.getWishListByUserId(userId); }

    @PostMapping("/register")
    public WishListDTO postWishList(@RequestBody WishListDTO wishListDTO) {
        return wishListService.saveWishList(wishListDTO);
    }

    @GetMapping("/{userId}/{isbn}")
    public boolean existCheck(@PathVariable Long userId, @PathVariable String isbn) { return wishListService.existByUserIdAndIsbn(userId, isbn); }

    @Transactional
    @DeleteMapping("/{userId}/{isbn}")
    public void deletePost(@PathVariable Long userId, @PathVariable String isbn) {
        wishListService.deleteByUserIdAndIsbn(userId, isbn);
    }
}
