package com.example.demo3.controller;

import com.example.demo3.dto.CommentDTO;
import com.example.demo3.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/community/{postId}/comments")
public class CommentController {

    @Autowired
    private CommentService service;

    @GetMapping
    public List<CommentDTO> getCommentsByPostId(@PathVariable Long postId) {
        return service.findByPostId(postId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommentDTO> getCommentById(@PathVariable Long id) {
        Optional<CommentDTO> comment = service.findById(id);
        return comment.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CommentDTO> createComment(@PathVariable Long postId, @RequestBody CommentDTO dto) {
        dto.setPostId(postId);
        CommentDTO createdComment = service.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdComment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommentDTO> updateComment(@PathVariable Long id, @RequestBody CommentDTO dto) {
        dto.setId(id);
        CommentDTO updatedComment = service.save(dto);
        return ResponseEntity.ok(updatedComment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
