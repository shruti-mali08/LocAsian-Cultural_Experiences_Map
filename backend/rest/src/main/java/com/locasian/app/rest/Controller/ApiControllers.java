package com.locasian.app.rest.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.locasian.app.rest.Models.Location;
import com.locasian.app.rest.Models.Favorite;
import com.locasian.app.rest.Models.Review;
import com.locasian.app.rest.Models.Users;
import com.locasian.app.rest.Repo.LocationRepo;
import com.locasian.app.rest.Repo.FavoriteRepo;
import com.locasian.app.rest.Repo.ReviewRepo;
import com.locasian.app.rest.Repo.UsersRepo;

@CrossOrigin(origins = {
    "http://localhost:5173",   
    "http://localhost:8100"    
})
@RestController
public class ApiControllers {

    @Autowired
    private UsersRepo usersRepo;
    @Autowired
    private LocationRepo locationRepo;
    @Autowired
    private FavoriteRepo favoriteRepo;
    @Autowired
    private ReviewRepo reviewRepo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @GetMapping("/")
    public String getPage() {
        return ("Welcome");
    }

    @GetMapping(value = "/users")
    public List<Users> getUsers() {
        return usersRepo.findAll();
    }

    @GetMapping("/users/exists")
    public boolean usernameExists(@RequestParam String username) {
        return usersRepo.existsByUsername(username);
    }


    @PostMapping("/saveUser")
    public ResponseEntity<?> saveUsers(@RequestBody Users user) {

        if (usersRepo.existsByUsername(user.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body("Username already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        usersRepo.save(user);
        return ResponseEntity.ok("User saved successfully");
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

    @GetMapping(value = "/locations")
    public List<Location> getLocations() {
        return locationRepo.findAll();
    }

    @PostMapping(value = "/saveLocation")
    public String saveLocation(@RequestBody Location location) {
        locationRepo.save(location);
        return "Saved...";
    }

    @PutMapping(value = "/updateLocation/{locationId}")
    public String updateLocation(@PathVariable long locationId, @RequestBody Location location) {
        Location updatedLocation = locationRepo.findById(locationId).get();
        updatedLocation.setName(location.getName()); 
        updatedLocation.setDetails(location.getDetails());
        updatedLocation.setAddress(location.getAddress());
        updatedLocation.setCreatedAt(location.getCreatedAt());
        locationRepo.save(updatedLocation);
        return "Updated...";
    }

    @DeleteMapping(value = "/deleteLocation/{id}")
    public String deleteLocation(@PathVariable long id) {
        Location deleteLocation = locationRepo.findById(id).get();
        locationRepo.delete(deleteLocation);
        return "Delete location with the id: "+id;
    }
    
    // Get all favourites for a specific user
@GetMapping("/users/{userId}/favorites")
public List<Favorite> getFavoritesByUser(@PathVariable String userId) {
  return favoriteRepo.findByUserId(userId);
}

// Add a favourite for a user
@PostMapping("/users/{userId}/favorites")
public Favorite addFavoriteForUser(
 @PathVariable String userId,
 @RequestBody Favorite favorite
) {
    // Avoid duplicates: if this user already favourited this restaurant, just return it
 Favorite existing = favoriteRepo.findByUserIdAndRestaurantName(
  userId,
  favorite.getRestaurantName()
 );
 if(existing != null){
  return existing;
 }

 favorite.setUserId(userId);
  if (favorite.getCreatedAt() == null) {
 favorite.setCreatedAt(java.time.LocalDateTime.now());
 }
  return favoriteRepo.save(favorite);
}

// Remove a favourite for a user + restaurant
@DeleteMapping("/users/{userId}/favorites/{restaurantName}")
public ResponseEntity<String> deleteFavoriteForUser(
        @PathVariable String userId,
        @PathVariable String restaurantName
) {
    System.out.println("DELETE favorite: userId=" + userId + ", restaurantName=" + restaurantName);

    Favorite existing = favoriteRepo.findByUserIdAndRestaurantName(userId, restaurantName);

    if (existing == null) {
        // nothing in DB with that key – return 404 instead of throwing a 500
        return ResponseEntity.notFound().build();
    }

    favoriteRepo.delete(existing);
    return ResponseEntity.ok(
            "Deleted favorite for user " + userId + " and restaurant " + restaurantName
    );
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

    @PutMapping(value = "/updateReview/{id}")
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