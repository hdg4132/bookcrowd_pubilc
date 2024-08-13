package com.example.demo3.persistence;

import com.example.demo3.model.CommunityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityRepository extends JpaRepository<CommunityEntity, Long> {
    // 최신 게시글이 먼저 오도록 정렬
    List<CommunityEntity> findAllByOrderByCreatedDateDesc();
}
