package com.example.demo3.service;

import com.example.demo3.dto.KeepingDTO;
import com.example.demo3.dto.RentDTO;
import com.example.demo3.model.RentEntity;
import com.example.demo3.persistence.BookRepository;
import com.example.demo3.persistence.KeepingRepository;
import com.example.demo3.persistence.RentRepository;
import com.example.demo3.persistence.UserRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class RentService {

    @Autowired
    private RentRepository rentRepository;

    @Autowired
    private KeepingRepository keepingRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    public List<RentDTO> getAllRentList() {
        log.info("List of all the rent");
        return rentRepository.findAll().stream()
                .map(RentDTO::new)
                .collect(Collectors.toList());
    }

    public RentDTO saveRent(RentDTO rentDTO) {
        log.info("new rent: {}", rentDTO);
        RentEntity rentEntity = RentDTO.toEntity(rentDTO);
//        rentEntity.setBorrowedId(userRepository.findById(rentDTO.getBorrowedId()).orElseThrow(() -> new IllegalArgumentException("로그인이 안되어있습니다")).getUserId());
//        rentEntity.setKeepingId(keepingRepository.findById(rentDTO.getKeepingId()).orElseThrow(() -> new IllegalArgumentException("대여자 정보가 잘못되었습니다")).getBookId());
        rentEntity = rentRepository.save(rentEntity);
        log.info("rent sucess: {}", rentEntity);
        return new RentDTO(rentEntity);
    }

    public RentDTO updateRent(final RentEntity entity) {
        final Optional<RentEntity> original = rentRepository.findById(entity.getRentId());
        if (original.isPresent()) {
            RentEntity rent = original.get();
            rent.setRentId(entity.getRentId());
            rent.setBorrowedId(entity.getBorrowedId());
            rent.setISBN(entity.getISBN());
            rent.setKeepingId(entity.getKeepingId());
            rent.setDescription(entity.getDescription());
            rent.setBorrowDate(entity.getBorrowDate());
            rent.setApproval(entity.getApproval());
            rent.setCause(entity.getCause());
            rent.setReturnDate(entity.getReturnDate());
            rentRepository.save(rent);
            log.info("rent updated:{}", rent.getRentId());
            return new RentDTO(rent);
        } else {
            log.warn("rent not found: {}", entity.getRentId());
            throw new RuntimeException("rent not found");
        }
    }

    public RentDTO updateRentApproval(final RentEntity entity) {
        final Optional<RentEntity> original = rentRepository.findById(entity.getRentId());
        if (original.isPresent()) {
            RentEntity rent = original.get();
            rent.setRentId(entity.getRentId());
            rent.setApproval(entity.getApproval());
            rentRepository.save(rent);
            log.info("rent updated : {}", rent.getRentId());
            return new RentDTO(rent);
        } else {
            log.warn("rent not found: {}", entity.getRentId());
            throw new RuntimeException("rent not found");
        }
    }

    public List<RentDTO> findByapproval(String approval) {
        log.info("List of all the approval");
        return rentRepository.findByApproval(approval)
                .stream()
                .map(RentDTO::new)
                .collect(Collectors.toList());
    }

    public List<RentDTO> findByisbn(String ISBN) {
        log.info("List of all the isbn");
        return rentRepository.findByISBN(ISBN)
                .stream()
                .map(RentDTO::new)
                .collect(Collectors.toList());
    }

    public List<RentDTO> findById(Integer rentId) {
        log.info("List of all the id");
        return rentRepository.findByRentId(rentId)
                .stream()
                .map(RentDTO::new)
                .collect(Collectors.toList());
    }

    public RentDTO updateBorrowDate(final RentEntity entity) {
        final Optional<RentEntity> original = rentRepository.findById(entity.getRentId());
        if (original.isPresent()) {
            RentEntity rent = original.get();
            rent.setRentId(entity.getRentId());
            rent.setBorrowDate(entity.getBorrowDate());
            rentRepository.save(rent);
            log.info("rent updated:{}", rent.getRentId());
            return new RentDTO(rent);
        } else {
            log.warn("rent not found: {}", entity.getRentId());
            throw new RuntimeException("rent not found");
        }
    }

    public RentDTO updateRentReject(final RentEntity entity) {
        final Optional<RentEntity> original = rentRepository.findById(entity.getRentId());
        if (original.isPresent()) {
            RentEntity rent = original.get();
            rent.setRentId(entity.getRentId());
            rent.setApproval(entity.getApproval());
            rent.setCause(entity.getCause());
            rentRepository.save(rent);
            log.info("rent updated:{}", rent.getRentId());
            return new RentDTO(rent);
        } else {
            log.warn("rent not found: {}", entity.getRentId());
            throw new RuntimeException("rent not found");
        }
    }

    public RentDTO updateRentReturn(final RentEntity entity) {
        final Optional<RentEntity> original = rentRepository.findById(entity.getRentId());
        if (original.isPresent()) {
            RentEntity rent = original.get();
            rent.setRentId(entity.getRentId());
            rent.setApproval(entity.getApproval());
            rent.setReturnDate(entity.getReturnDate());
            rentRepository.save(rent);
            log.info("rent updated:{}", rent.getRentId());
            return new RentDTO(rent);
        } else {
            log.warn("rent not found: {}", entity.getRentId());
            throw new RuntimeException("rent not found");
        }
    }

    public RentDTO bookmatching(final RentEntity entity) {
        final Optional<RentEntity> original = rentRepository.findById(entity.getRentId());
        if (original.isPresent()) {
            RentEntity rent = original.get();
            rent.setRentId(entity.getRentId());
            rent.setApproval(entity.getApproval());
            rent.setBorrowDate(entity.getBorrowDate());
            rentRepository.save(rent);
            log.info("rent updated:{}", rent.getRentId());
            return new RentDTO(rent);
        } else {
            log.warn("rent not found: {}", entity.getRentId());
            throw new RuntimeException("rent not found");
        }
    }
}
