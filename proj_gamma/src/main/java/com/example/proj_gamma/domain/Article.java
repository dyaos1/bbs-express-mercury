package com.example.proj_gamma.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.Objects;


//@Table(indexes = {
//        @Index(columnList = "title"),
//        @Index(columnList = "created_at"),
//        @Index(columnList = "created_by"),
//})
@Getter
@Entity
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Setter
    @Column(nullable = false)
    private String title;

    @Setter
    @Column(nullable = false, length = 5000)
    private String body;

//    @CreatedDate
//    @Column(nullable = false)
//    private LocalDateTime created_at;
//
//    @CreatedBy
//    @Column(nullable = false)
//    private String created_by;
//
//    @LastModifiedDate
//    @Column(nullable = false)
//    private LocalDateTime updated_at;

    protected Article() {
    }

    public Article(String title, String body) {
        this.title = title;
        this.body = body;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Article article = (Article) o;
        return Objects.equals(id, article.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Article{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", body='" + body + '\'' +
                '}';
    }
}
