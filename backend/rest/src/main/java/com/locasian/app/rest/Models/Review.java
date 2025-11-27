package com.locasian.app.rest.Models;
import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String title;
    @Column
    private String body;
    @Column
    private String user_id;
    @Column
    private int rating;
    @Column
    private LocalDateTime created_at;

public long getId() {
    return id;
}

public void setId(long id) {
    this.id = id;
}

public String getTitle() {
    return title;
}

public void setTitle(String title) {
    this.title = title;
}

public String getBody() {
    return body;
}

public void setBody(String body) {
    this.body = body;
}

public String getUser_id() {
    return user_id;
}

public void setUser_id(String user_id) {
    this.user_id = user_id;
}

public int getRating() {
    return rating;
}

public void setRating(int rating) {
    this.rating = rating;
}

public LocalDateTime getCreated_at() {
    return created_at;
}

public void setCreated_at(LocalDateTime created_at) {
    this.created_at = created_at;
}

}