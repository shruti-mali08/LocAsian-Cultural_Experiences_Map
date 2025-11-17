package com.locasian.app.rest.Models;
import java.time.LocalDateTime;
import javax.persistence.*;

@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_id;
    @Column
    private String username;
    @Column
    private LocalDateTime created_at;


public int get_user_id() {
    return user_id;
}

public void set_user_id(int user_id) {
    this.user_id = user_id;
}

public String get_username() {
    return username;
}

public void set_username(String username) {
    this.username = username;
}

public LocalDateTime get_created_at() {
    return created_at;
}

public void set_created_at(LocalDateTime created_at) {
    this.created_at = created_at;
} 
}