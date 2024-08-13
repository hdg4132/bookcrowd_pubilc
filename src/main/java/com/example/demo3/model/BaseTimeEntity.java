package com.example.demo3.model;

import jakarta.persistence.*;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseTimeEntity {

  private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");

  @CreatedDate
  @Column(name = "create_date", updatable = false)
  private String createdDate;

  @LastModifiedDate
  @Column(name = "modified_date")
  private String modifiedDate;

  @PrePersist
  public void onPrePersist() {
    LocalDateTime now = LocalDateTime.now();
    this.createdDate = now.format(FORMATTER);
    this.modifiedDate = this.createdDate;
  }

  @PreUpdate
  public void onPreUpdate() {
    this.modifiedDate = LocalDateTime.now().format(FORMATTER);
  }
}
