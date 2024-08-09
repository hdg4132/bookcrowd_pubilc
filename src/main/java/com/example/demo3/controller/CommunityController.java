package com.example.demo3.controller;


import com.example.demo3.dto.CommunityDTO;
import com.example.demo3.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/community")
public class CommunityController {

  @Autowired
  private CommunityService communityService;

  @GetMapping
  public List<CommunityDTO> getAllPosts() {
    return communityService.findAll();
  }


  @GetMapping("/{id}")
  public ResponseEntity<CommunityDTO> getPostById(@PathVariable Long id) {
    Optional<CommunityDTO> post = communityService.findById(id);
    return post.map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  public ResponseEntity<CommunityDTO> createPost(@RequestBody CommunityDTO dto) {
    CommunityDTO createdPost = communityService.save(dto);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
  }

  @PutMapping("/{id}")
  public ResponseEntity<CommunityDTO> updatePost(@PathVariable Long id, @RequestBody CommunityDTO dto) {
    dto.setId(id);
    CommunityDTO updatedPost = communityService.save(dto);
    return ResponseEntity.ok(updatedPost);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletePost(@PathVariable Long id) {
    communityService.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}


