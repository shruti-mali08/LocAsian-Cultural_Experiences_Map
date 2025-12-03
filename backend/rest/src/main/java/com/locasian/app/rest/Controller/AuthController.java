package com.locasian.app.rest.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.locasian.app.rest.Models.LoginRequest;
import com.locasian.app.rest.Models.Users;
import com.locasian.app.rest.Repo.UsersRepo;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Users user = usersRepo.findByUsername(request.getUsername());

        if (user == null) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        boolean matches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!matches) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        return ResponseEntity.ok("Login successful");
    }
}
