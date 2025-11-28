package com.locasian.app.rest.Repo;

import com.locasian.app.rest.Models.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepo extends JpaRepository<Review, Long>{
    
}
