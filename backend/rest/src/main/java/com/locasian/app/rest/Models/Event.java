package com.locasian.app.rest.Models;
import java.time.LocalDateTime;
import jakarta.persistence.*;

public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String title;
    @Column
    private String body;
    @Column
    private long authorId;
    @Column
    private LocalDateTime startTime;
    @Column
    private LocalDateTime endTime;
    @Column
    private LocalDateTime createdAt;

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

public long getAuthorId() {
    return authorId;
}

public void setAuthorId(long authorId) {
    this.authorId = authorId;
}

public LocalDateTime getStartTime() {
    return startTime;
}

public void setStartTime(LocalDateTime startTime) {
    this.startTime = startTime;
}

public LocalDateTime getEndTime() {
    return endTime;
}

public void setEndTime(LocalDateTime endTime) {
    this.endTime = endTime;
}

public LocalDateTime getCreatedAt() {
    return createdAt;
}

public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
}
}
