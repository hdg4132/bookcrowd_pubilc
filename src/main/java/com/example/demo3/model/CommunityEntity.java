package com.example.demo3.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "community")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommunityEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "communityId")
  private Long id;

  private String title;

  private String content;

  private String writer;

  private String date;
}
