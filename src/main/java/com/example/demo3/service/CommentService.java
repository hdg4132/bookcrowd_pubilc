package com.example.demo3.service;

import com.example.demo3.dto.CommentDTO;
import com.example.demo3.model.CommentEntity;
import com.example.demo3.persistence.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public List<CommentDTO> findByPostId(Long postId) {
        return commentRepository.findByPostId(postId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<CommentDTO> findById(Long id) {
        return commentRepository.findById(id).map(this::toDTO);
    }

    public CommentDTO save(CommentDTO dto) {
        CommentEntity entity = toEntity(dto);
        CommentEntity savedEntity = commentRepository.save(entity);
        return toDTO(savedEntity);
    }

    public void deleteById(Long id) {
        commentRepository.deleteById(id);
    }

    private CommentDTO toDTO(CommentEntity entity) {
        return new CommentDTO(entity.getId(), entity.getWriter(), entity.getComment(), entity.getPostId());
    }

    private CommentEntity toEntity(CommentDTO dto) {
        return CommentEntity.builder()
                .id(dto.getId())
                .writer(dto.getWriter())
                .comment(dto.getComment())
                .postId(dto.getPostId())
                .build();
    }
}
