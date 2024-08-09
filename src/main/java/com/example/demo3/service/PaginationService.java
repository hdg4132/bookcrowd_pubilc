package com.example.demo3.service;

import com.example.demo3.dto.RentDTO;
import com.example.demo3.model.RentEntity;
import com.example.demo3.persistence.PaginationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class PaginationService {

    @Autowired
    private PaginationRepository paginationRentRepository;

    public Page<RentDTO> findByBorrowedId(Long borrowedId, int page) {
        int size = 5; // 페이지당 항목 수를 5로 설정
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<RentEntity> rentEntities = paginationRentRepository.findByBorrowedId(borrowedId, pageRequest);
        return rentEntities.map(RentDTO::new);
    }
}
