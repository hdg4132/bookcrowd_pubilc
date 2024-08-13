package com.example.demo3.service;

import com.example.demo3.dto.WishListDTO;
import com.example.demo3.model.WishListEntity;
import com.example.demo3.persistence.WishListRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class WishListService {
    @Autowired
    WishListRepository wishListRepository;

    public List<WishListDTO> getAllwishList() {
        log.info("List of all the wishlist");
        return wishListRepository.findAll().stream()
                .map(WishListDTO::new)
                .collect(Collectors.toList());
    }

    public List<WishListDTO> getWishListByUserId(Long userId) {
        log.info("List of all the wishlist");
        return wishListRepository.findByUserId(userId).stream()
                .map(WishListDTO::new)
                .collect(Collectors.toList());
    }

    public WishListDTO saveWishList(WishListDTO wishListDTO) {
        log.info("new rent: {}", wishListDTO);
        WishListEntity wishListEntity = WishListDTO.toEntity(wishListDTO);
        wishListEntity = wishListRepository.save(wishListEntity);
        log.info("rent sucess: {}", wishListDTO);
        return new WishListDTO(wishListEntity);
    }

    public boolean existByUserIdAndIsbn(Long userId, String isbn){
        return wishListRepository.existsByUserIdAndIsbn(userId, isbn);
    }

    public void deleteByUserIdAndIsbn(Long userId, String isbn) {
        wishListRepository.deleteByUserIdAndIsbn(userId, isbn);
    }
}
