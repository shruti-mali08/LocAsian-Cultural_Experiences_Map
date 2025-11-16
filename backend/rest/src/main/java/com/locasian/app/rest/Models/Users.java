package com.locasian.app.rest.Models;
import java.time.LocalDateTime;

public class Users {
    private int user_id;
    private String username;
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