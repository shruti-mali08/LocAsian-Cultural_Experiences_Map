package com.locasian.app.rest.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.locasian.app.rest.Models.Users;
import com.locasian.app.rest.Repo.UsersRepo;

@RestController
@CrossOrigin(origins = "http://localhost:5173")  // Vite/Ionic dev server
public class ApiControllers {

    @Autowired
    private UsersRepo usersRepo;

    @GetMapping("/")
    public String getPage() {
        return ("Welcome");
    }

    @GetMapping(value = "/users")
    public List<Users> getUsers() {
        return usersRepo.findAll();
    }

    @PostMapping(value = "/save")
    public String saveUsers(@RequestBody Users user) {
        usersRepo.save(user);
        return "Saved...";
    }

    @PutMapping(value = "/update/{user_id}")
    public String updateUser(@PathVariable long user_id, @RequestBody Users user) {
        Users updatedUser = usersRepo.findById(user_id).get();
        updatedUser.setUsername(user.getUsername()); 
        updatedUser.setCreated_at(user.getCreated_at());
        usersRepo.save(updatedUser);
        return "Updated...";
    }

    @DeleteMapping(value = "/delete/{user_id}")
    public String deleteUser(@PathVariable long user_id) {
        Users deleteUsers = usersRepo.findById(user_id).get();
        usersRepo.delete(deleteUsers);
        return "Delete user with the id: "+user_id;
    }
}