# LocAsian - Asian Cultural Experiences Map

A mobile application for discovering Asian restaurants and cultural experiences in your area.

## Live Demo

You can see the application in action here:

▶️ **[Watch the Project Demo Video](https://github.com/user-attachments/assets/1fef6f82-1c44-4f8d-a487-3febcca02ee1)**

> 💡 **Tip:** If the link above doesn't open instantly, you can also access the raw video file [directly here](https://github.com/user-attachments/assets/1fef6f82-1c44-4f8d-a487-3febcca02ee1).


## Tech Stack

- **Frontend**: Ionic React
- **Backend**: Spring Boot (Java)
- **Database**: MySQL 8.0 (Docker)

## Project Structure

### Database Entities

The application uses 4 main entities, each with:
- A primary key of type `long` that auto-increments
- A `createdAt` field of type `LocalDateTime` to track creation time

**Users**: Stores login information for each user. Note that `userId` (primary key) is distinct from `username` (display name chosen by users).

**Event**: Contains event information with fields including `id` (primary key), `title` (String), and `body` (String) for description text.

**Favorite**: 'id', 'userID', 'restaurantName', 'createdAt'

**Review**: 'id' (primary key), 'body' text, userId (Int), rating (int)

## Setup Instructions

### 1. Start MySQL Database

From the project root directory:

```bash
docker compose up -d db
```

This starts a MySQL 8.0 container on port **3307**.

### 2. Run the Backend

From the `backend/rest` directory:

```bash
./mvnw spring-boot:run
```

Backend runs on: **http://localhost:8080**

### 3. Run the Frontend

From the `myApp` directory:

```bash
npm install
npm run dev
```

Frontend runs on: **http://localhost:8100**

## Testing with Postman

We use Postman to test HTTP requests (GET, POST, UPDATE, DELETE) to our MySQL database.

**Access the Postman Collection**: [Locasian Workspace](https://jakefulton1-3616627.postman.co/workspace/Locasian-Postman-Workspace~ae34f0bb-319f-432a-8820-064eeb15202a/collection/undefined?action=share&creator=50115094)

The collection is accessible to:
- All team members (edit access)
- Professor: vonfrankenberg@pitt.edu
- TA: hay149@pitt.edu

The collection can be accessed in browsers, or you can [download the Postman application](https://www.postman.com/downloads/).

## Team

CS 1530 - Software Engineering  
University of Pittsburgh  
- Katie Whiteford (Scrum Master)
- Shruti Mali (Product Owner)
- Xiaoting Wang (Developer)
- Jake Fulton (Developer)
- Kenneth Lin (Developer)
- Minakshi Thapa (Developer)
