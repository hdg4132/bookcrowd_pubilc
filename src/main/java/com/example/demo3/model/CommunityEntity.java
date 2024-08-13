package com.example.demo3.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "community")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true) // 상위 클래스의 필드와 메소드를 포함
public class CommunityEntity extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "communityId")
  private Long id;

  private String title;

  @Column(columnDefinition = "TEXT")
  private String content;

  private String writer;
}
