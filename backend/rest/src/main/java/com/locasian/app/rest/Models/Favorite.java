package com.locasian.app.rest.Models;
import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String userId;
    @Column
    private String restaurantName;
    @Column
    private LocalDateTime createdAt;

public long getId() {
    return id;
}

public void setId(long id) {
    this.id = id;
}

public String getUserId() {
    return userId;
}

public void setUserId(String userId) {
    this.userId = userId;
}

public String getRestaurantName() {
    return restaurantName;
}

public void setRestaurantName(String restaurantName) {
    this.restaurantName = restaurantName;
} 

public LocalDateTime getCreatedAt() {
    return createdAt;
}

public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
}
}
