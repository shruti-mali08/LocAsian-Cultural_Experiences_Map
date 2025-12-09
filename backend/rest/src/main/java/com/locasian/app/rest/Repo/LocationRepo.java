package com.locasian.app.rest.Repo;

import com.locasian.app.rest.Models.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepo extends JpaRepository<Location, Long> {
    
}
