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
import org.hibernate.boot.archive.scan.internal.ScanResultImpl;
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
        rentEntity = rentRepository.save(rentEntity);
        List<RentEntity> count = rentRepository.findByBorrowedId(rentDTO.getBorrowedId());
        count.forEach(rent ->
                rent.setRentBookCount(rentRepository.countByborrowedIdAndApproval(rentDTO.getBorrowedId(), "2")));
        rentRepository.saveAll(count);
        log.info("rent sucess: {}", rentEntity);
        return new RentDTO(rentEntity);
    }

    public RentDTO updateRent(final RentEntity entity) {
        final Optional<RentEntity> original = rentRepository.findById(entity.getRentId());
        if (original.isPresent()) {
            RentEntity rent = original.get();
            rent.setRentId(entity.getRentId());
            rent.setBorrowedId(entity.getBorrowedId());
            rent.setIsbn(entity.getIsbn());
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
        log.info("List of all the findByapproval");
        return rentRepository.findByApproval(approval)
                .stream()
                .map(RentDTO::new)
                .collect(Collectors.toList());
    }

    public List<RentDTO> findByisbn(String ISBN) {
        log.info("List of all the findByisbn");
        return rentRepository.findByIsbn(ISBN)
                .stream()
                .map(RentDTO::new)
                .collect(Collectors.toList());
    }

    public List<RentDTO> findById(Integer rentId) {
        log.info("List of all the findById");
        return rentRepository.findByRentId(rentId)
                .stream()
                .map(RentDTO::new)
                .collect(Collectors.toList());
    }

    public List<RentDTO> findByBorrowedId(Long userId) {
        log.info("List of all the findByBorrowedId");
        return rentRepository.findByBorrowedId(userId)
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
            List<RentEntity> count = rentRepository.findByBorrowedId(rent.getBorrowedId());
            count.forEach(rentEntity ->
                    rentEntity.setRentBookCount(rentRepository.countByborrowedIdAndApproval(rent.getBorrowedId(), "2")));
            rentRepository.saveAll(count);
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
            rent.setKeepingId(entity.getKeepingId());
            rent.setBookId(entity.getBookId());
            rentRepository.save(rent);
            List<RentEntity> count = rentRepository.findByBorrowedId(rent.getBorrowedId());
            count.forEach(rentEntity ->
                    rentEntity.setRentBookCount(rentRepository.countByborrowedIdAndApproval(rent.getBorrowedId(), "2")));
            rentRepository.saveAll(count);
            log.info("rent updated:{}", rent.getRentId());
            return new RentDTO(rent);
        } else {
            log.warn("rent not found: {}", entity.getRentId());
            throw new RuntimeException("rent not found");
        }
    }
}
