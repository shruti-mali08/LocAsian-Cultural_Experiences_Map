Welcome to the backend and database section of the Asian Cultural Experiences Map!

In our repository, navigate to Asian-Cultural-Experiences-Map/backend/rest/src/main/java/com/locasian/app
/rest to see the bulk of the code. 
There are 4 entities, Users, Event, Favorite, and Review. Each entity has their own primary key of type long, which automatically counts upwards as new instances are created, guaranteeing a unique value for each instance. Each entity also has a variable of type LocalDateTime and is called createdAt. createdAt should store the time at which the associated instance was created. 
* Users stores the login information for each user. Note that userId is distinct from username. userId is the primary key, while the username is what users choose to be displayed as. 
* Event has a primary key id, a String title, a String body for any description text, ...
* Favorite ...
* Review ...
The following link leads to an application called Postman which is being used to provide HTTP requests to get, post, update, and delete data form our MySQL database. 
[Postman Collection Link](https://jakefulton1-3616627.postman.co/workspace/Jake-Fulton's-Workspace~](https://jakefulton1-3616627.postman.co/workspace/Locasian-Postman-Workspace~ae34f0bb-319f-432a-8820-064eeb15202a/collection/undefined?action=share&creator=50115094)
I've managed the access of the collection of requests so that all of our team members can edit, as well as vonfrankenberg@pitt.edu (our professor) and hay149@pitt.edu (our TA). If you are having any trouble reaching it, please reach out to Jake Fulton at jkf31@pitt.edu
It should be accessible in browsers, but if you'd like to work with the application itself, [here](https://www.postman.com/downloads/) is where you can download it.

---------------------------------------------------------------------------------------------------------------------------------

##Docker Setup Instructions:

Use Docker to run the MySQL database so the backend works the same for everyone.

#Start MySQL
From the project root:

    - docker compose up -d db
This starts a MySQL 8.0 container on port 3307.

#Run the Backend
From backend/rest:

   - ./mvnw spring-boot:run
Backend runs on:
http://localhost:8080

#Run the Frontend
From myApp:

npm install
npm run dev

Frontend runs on:
http://localhost:5173

Stop MySQL (optional)
docker compose down








