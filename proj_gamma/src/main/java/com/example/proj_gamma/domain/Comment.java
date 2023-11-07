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
        @Index(columnList = "content"),
        @Index(columnList = "created_at"),
        @Index(columnList = "created_by"),
})
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Setter
    @Column(nullable = false)
    private String content;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime created_at;

    @CreatedBy
    @Column(nullable = false)
    private String created_by;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updated_at;

    protected Comment() {
    }

    private Comment(String content) {
        this.content = content;
    }

    public static Comment of(String content) {
        return new Comment(content);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Comment comment = (Comment) o;
        return Objects.equals(id, comment.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", created_at=" + created_at +
                ", created_by='" + created_by + '\'' +
                ", updated_at=" + updated_at +
                '}';
    }
}
