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


import com.locasian.app.rest.Models.Users;
import com.locasian.app.rest.Models.Event;
import com.locasian.app.rest.Models.Favorite;
import com.locasian.app.rest.Models.Review;

import com.locasian.app.rest.Repo.UsersRepo;
import com.locasian.app.rest.Repo.EventRepo;
import com.locasian.app.rest.Repo.FavoriteRepo;
import com.locasian.app.rest.Repo.ReviewRepo;


@RestController
public class ApiControllers {

    @Autowired
    private UsersRepo usersRepo;
    @Autowired
    private EventRepo eventRepo;
    @Autowired
    private FavoriteRepo favoriteRepo;
    @Autowired
    private ReviewRepo reviewRepo;

    @GetMapping("/")
    public String getPage() {
        return ("Welcome");
    }

    @GetMapping(value = "/users")
    public List<Users> getUsers() {
        return usersRepo.findAll();
    }

    @PostMapping(value = "/saveUser")
    public String saveUsers(@RequestBody Users user) {
        usersRepo.save(user);
        return "Saved...";
    }

    @PutMapping(value = "/updateUser/{userId}")
    public String updateUser(@PathVariable long userId, @RequestBody Users user) {
        Users updatedUser = usersRepo.findById(userId).get();
        updatedUser.setUsername(user.getUsername()); 
        updatedUser.setPassword(user.getPassword()); 
        updatedUser.setCreatedAt(user.getCreatedAt());
        usersRepo.save(updatedUser);
        return "Updated...";
    }

    @DeleteMapping(value = "/deleteUser/{userId}")
    public String deleteUser(@PathVariable long userId) {
        Users deleteUsers = usersRepo.findById(userId).get();
        usersRepo.delete(deleteUsers);
        return "Delete user with the id: "+userId;
    }

    @GetMapping(value = "/events")
    public List<Event> getEvents() {
        return eventRepo.findAll();
    }

    @PostMapping(value = "/saveEvent")
    public String saveEvent(@RequestBody Event event) {
        eventRepo.save(event);
        return "Saved...";
    }

    @PutMapping(value = "/updateEvent/{eventId}")
    public String updateEvent(@PathVariable long eventId, @RequestBody Event event) {
        Event updatedEvent = eventRepo.findById(eventId).get();
        updatedEvent.setTitle(event.getTitle()); 
        updatedEvent.setBody(event.getBody());
        updatedEvent.setAuthorId(event.getAuthorId());
        updatedEvent.setStartTime(event.getStartTime());
        updatedEvent.setEndTime(event.getEndTime());
        updatedEvent.setCreatedAt(event.getCreatedAt());
        eventRepo.save(updatedEvent);
        return "Updated...";
    }

    @DeleteMapping(value = "/deleteEvent/{id}")
    public String deleteEvent(@PathVariable long id) {
        Event deleteEvent = eventRepo.findById(id).get();
        eventRepo.delete(deleteEvent);
        return "Delete event with the id: "+id;
    }

    @GetMapping(value = "/favorites")
    public List<Favorite> getFavorites() {
        return favoriteRepo.findAll();
    }

    @PostMapping(value = "/saveFavorite")
    public String saveFavorite(@RequestBody Favorite favorite) {
        favoriteRepo.save(favorite);
        return "Saved...";
    }

    @PutMapping(value = "/updateFavorite/{id}")
    public String updateFavorite(@PathVariable long id, @RequestBody Favorite favorite) {
        Favorite updatedFavorite = favoriteRepo.findById(id).get();
        updatedFavorite.setUserId(favorite.getUserId());
        updatedFavorite.setRestaurantName(favorite.getRestaurantName());
        updatedFavorite.setCreatedAt(favorite.getCreatedAt());
        favoriteRepo.save(updatedFavorite);
        return "Updated...";
    }

    @DeleteMapping(value = "/deleteFavorite/{id}")
    public String deleteFavorite(@PathVariable long id) {
        Favorite deleteFavorite = favoriteRepo.findById(id).get();
        favoriteRepo.delete(deleteFavorite);
        return "Delete favorite with the id: "+id;
    }

    @GetMapping(value = "/reviews")
    public List<Review> getReviews() {
        return reviewRepo.findAll();
    }

    @PostMapping(value = "/saveReview")
    public String saveReview(@RequestBody Review review) {
        reviewRepo.save(review);
        return "Saved...";
    }

    @PutMapping(value = "/updateReview/{id}")//title body userId rating
    public String updateReview(@PathVariable long id, @RequestBody Review review) {
        Review updatedReview = reviewRepo.findById(id).get();
        updatedReview.setTitle(review.getTitle());
        updatedReview.setBody(review.getBody());
        updatedReview.setUserId(review.getUserId());
        updatedReview.setRating(review.getRating());
        updatedReview.setCreatedAt(review.getCreatedAt());
        reviewRepo.save(updatedReview);
        return "Updated...";
    }

    @DeleteMapping(value = "/delete/{id}")
    public String deleteReview(@PathVariable long id) {
        Review deleteReview = reviewRepo.findById(id).get();
        reviewRepo.delete(deleteReview);
        return "Delete review with the id: "+id;
    }
}