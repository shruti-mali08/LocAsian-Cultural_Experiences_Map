Welcome to the backend and database section of the Asian Cultural Experiences Map!

(Jake)
In our repository, navigate to Asian-Cultural-Experiences-Map/backend/rest/src/main/java/com/locasian/app
/rest to see the bulk of the backend code. 
There are 4 entities, Users, Favorite, Location, and Review. Each entity has their own primary key of type long, which automatically counts upwards as new instances are created, guaranteeing a unique value for each instance. Each entity also has a variable of type LocalDateTime called createdAt. createdAt should store the time at which the associated instance was created. 
* Users stores the login information for each user. Note that userId is distinct from username. userId is the primary key, while the username is what users choose to be displayed as. 
* Location stores data about any restaurant or event that we add into our app.
* Favorite was created so that Users can bookmark locations to be seen later. It stores information about each location a user chooses to favorite.
* Review is the only database that we didn't end up using. It is complete and has working endpoints, but we never connected it to the front end of our app.
The following link leads to an application called Postman which is being used to provide HTTP requests to get, post, update, and delete data form our MySQL database.

[Postman Collection Link](https://jakefulton1-3616627.postman.co/workspace/Locasian-Postman-Workspace~ae34f0bb-319f-432a-8820-064eeb15202a/request/50115094-facef42f-8ccc-4931-8893-bcd6bc8a780e?action=share&creator=50115094&ctx=documentation)

I've sent invites to all of our team members, as well as vonfrankenberg@pitt.edu (our professor) and hay149@pitt.edu (our TA). If you are having any trouble reaching it, please reach out to Jake Fulton at jkf31@pitt.edu
It should be accessible in browsers, but if you'd like to work with the application itself, [here](https://www.postman.com/downloads/) is where you can download it.

---------------------------------------------------------------------------------------------------------------------------------

##Docker Setup Instructions (Minakshi):

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








