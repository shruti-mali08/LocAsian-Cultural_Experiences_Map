package com.locasian.app.rest.Models;
import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long user_id;
    @Column
    private String username;
    @Column
    private LocalDateTime created_at;


public long getUser_id() {
    return user_id;
}

public void setUser_id(long user_id) {
    this.user_id = user_id;
}

public String getUsername() {
    return username;
}

public void setUsername(String username) {
    this.username = username;
}

public LocalDateTime getCreated_at() {
    return created_at;
}

public void setCreated_at(LocalDateTime created_at) {
    this.created_at = created_at;
} 
}