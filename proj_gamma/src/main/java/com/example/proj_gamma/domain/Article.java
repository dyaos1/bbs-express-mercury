package com.example.proj_gamma.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Table(indexes = {
        @Index(columnList = "title"),
        @Index(columnList = "created_at"),
        @Index(columnList = "created_by"),
})
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

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime created_at;

    @CreatedBy
    @Column(nullable = false)
    private String created_by;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updated_at;

    protected Article() {
    }

    private Article(String title, String body) {
        this.title = title;
        this.body = body;
    }
    public static Article of(String title, String body) {
        return new Article(title, body);
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
                ", created_at=" + created_at +
                ", created_by='" + created_by + '\'' +
                ", updated_at=" + updated_at +
                '}';
    }
}
