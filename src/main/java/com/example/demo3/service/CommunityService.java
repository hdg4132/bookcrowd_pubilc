package com.example.demo3.service;


import com.example.demo3.dto.CommunityDTO;
import com.example.demo3.model.CommunityEntity;
import com.example.demo3.persistence.CommunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommunityService {

  @Autowired
  private CommunityRepository repository;

  public List<CommunityDTO> findAll() {
    return repository.findAllByOrderByDateDesc().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
  }

  public Optional<CommunityDTO> findById(Long id) {
    return repository.findById(id).map(this::convertToDTO);
  }

  public CommunityDTO save(CommunityDTO dto) {
    CommunityEntity entity = convertToEntity(dto);
    return convertToDTO(repository.save(entity));
  }

  public void deleteById(Long id) {
    repository.deleteById(id);
  }

  private CommunityDTO convertToDTO(CommunityEntity entity) {
    return CommunityDTO.builder()
            .id(entity.getId())
            .title(entity.getTitle())
            .content(entity.getContent())
            .writer(entity.getWriter())
            .date(entity.getDate())
            .build();
  }

  private CommunityEntity convertToEntity(CommunityDTO dto) {
    return CommunityEntity.builder()
            .id(dto.getId())
            .title(dto.getTitle())
            .content(dto.getContent())
            .writer(dto.getWriter())
            .date(dto.getDate())
            .build();
  }
}
