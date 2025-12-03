package com.locasian.app.rest.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.locasian.app.rest.Models.Users;

public interface UsersRepo extends JpaRepository<Users, Long> {

    Users findByUserId(Long userId);

    Users findByUsername(String username);
}