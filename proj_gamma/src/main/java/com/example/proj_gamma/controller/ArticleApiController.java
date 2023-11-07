package com.example.proj_gamma.controller;

import com.example.proj_gamma.domain.Article;
import com.example.proj_gamma.exceptions.ArticleNotFoundException;
import com.example.proj_gamma.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ArticleApiController {
    private final ArticleRepository articleRepository;

    @GetMapping("/")
    List<Article> all() {
        return articleRepository.findAll();
    }

    @PostMapping("/")
    Article newArticle(@RequestBody Article newArticle) {
        return articleRepository.save(newArticle);
    }

    @GetMapping("/{id}")
    Article one(@PathVariable Long id) {
        return articleRepository
                .findById(id)
                .orElseThrow(() -> new ArticleNotFoundException(id));
    }
}
