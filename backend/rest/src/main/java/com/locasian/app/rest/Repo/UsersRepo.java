package com.locasian.app.rest.Repo;

import com.locasian.app.rest.Models.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepo extends JpaRepository<Users, Long> {

}