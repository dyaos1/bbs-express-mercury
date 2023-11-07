package com.example.proj_gamma.repository;

import com.example.proj_gamma.domain.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {

}
