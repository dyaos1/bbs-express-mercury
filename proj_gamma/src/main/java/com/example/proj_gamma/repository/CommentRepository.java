package com.example.proj_gamma.repository;

import com.example.proj_gamma.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
