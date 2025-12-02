package com.locasian.app.rest.Repo;

import com.locasian.app.rest.Models.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteRepo extends JpaRepository<Favorite, Long>{
    
}