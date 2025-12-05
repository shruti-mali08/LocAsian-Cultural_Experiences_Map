package com.locasian.app.rest.Repo;

import java.util.List;

import com.locasian.app.rest.Models.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteRepo extends JpaRepository<Favorite, Long> {

  // all favourites for one user
 List<Favorite> findByUserId(String userId);

 // one favourite for a given user + restaurant
   Favorite findByUserIdAndRestaurantName(String userId, String restaurantName);

 // delete by user + restaurant
 void deleteByUserIdAndRestaurantName(String userId, String restaurantName);
}