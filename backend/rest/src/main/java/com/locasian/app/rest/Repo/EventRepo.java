package com.locasian.app.rest.Repo;

import com.locasian.app.rest.Models.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepo extends JpaRepository<Event, Long> {
    
}
