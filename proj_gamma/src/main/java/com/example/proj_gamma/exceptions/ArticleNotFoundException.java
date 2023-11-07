package com.example.proj_gamma.exceptions;

public class ArticleNotFoundException extends RuntimeException {
    public ArticleNotFoundException(Long id) {
        super("could not found article" + id);
    }
}
