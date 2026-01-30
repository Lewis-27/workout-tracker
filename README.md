# Workout Tracker #
**Link to project:**

Workout tracker is a simple web app that allows users to create workouts to represent a day at the gym. Users create individual workout templates such as 'Arm Day' or 'Push Day'. 
Inside these workouts they can list exercises they will complete as part of the workout such as 'Curl' or 'Bench Press'. They can then add sets to the workout such as 12 repetitions at 10 kg.

## How it's made ##
**Tech used:** Node, Express, postgreSQL, JWT, BCryptJS, HTML, CSS, React, Zustand, ShadCN, Tailwind, Tanstack Query

### Backend

The backend of the project consists of an Express server running on Node JS, it uses custom endpoints such as `/api/user/profile` or `/api/workouts` to manipulate a postgreSQL relational database.

**Database**

The database consists of a series of tables, one for each distrinct piece of data: users, workouts, exercises and sets.

Each of these tables maintains a many-to-one relationship with the next table along (Users -> Workouts -> Exercises -> Sets) using foreign keys to refer to the table to which it belongs. For example, each user can have many workouts but each workout belongs only to one user.

Using SQL queries it is possible to select the data from the database such as all of the sets that belong to a specific exercises: 
```
SELECT sets.id, exercise_id, exercise_name, weight, reps, sets.time_created 
FROM sets 
INNER JOIN exercises ON sets.exercise_id = exercises.id WHERE exercise_id=$1 
ORDER BY sets.time_created ASC
```

**Express Server**

The express server serves to connect HTTP requests (such as `GET /api/workouts/1` or `POST /api/exercises/workout/4`) to SQL queries that perform CRUD (Create, Read, Update, Delete) actions on the database.

Each request contains route parameters such as the id of the targeted resource in the case of GET, PUT and DELETE requests and/or JSON data in the case of POST and PUT requests. 

**Controller Functions**

The express router passes each request on to the relevant controller function based on the endpoint and type of request made. For example `GET /api/workouts/1` would be passed on the controller function `getWorkoutById`

These controller functions will pull the relevant data from the route parameter and request body and format it into an SQL query. This query is then carried out on the database and the results to passed back to the controller function which formats the data into a HTTP response

**Handling Users**

The first step for a user to interact with the app is to create an account. This is handled in the backend with a series of api calls. 

First a request is made to `POST /api/users` containing the user's name, email and password. 

The controller function formats this data into an SQL query to insert new data into the users table. As part of this it is necessary for security to hash the users password so it is not stored in the database as plaintext. 

Hashing the password was done using the library `bcryptjs` via a function to take in the password and output a hash.

Once the SQL query is successfully carried out the returned information which includes the user's id is returned to the user as part of the response. 

In addition a JWT (JSON Web Token) cookie is generated containing the user's id. The existence of the JWT cookie is what verifies that the users is currently logged in.

A similar process is carried out for logging a user in, the user submits a POST request containing their email and password. 

The controller function searches for a user with the email supplied, then using the compare function from bcryptjs, the entered password is compared to the password in the database. 

If either an account is not found for the email, or the password doesn't match, an error is thrown stating that the entered credentials are incorrect, otherwise a JWT cookie is created using the user's id.

For logging the user out, the controller function removes any currently stored JWT cookies.

Aside from the register a new user and logging in a user endpoint, all other endpoints require the existence of a valid JWT cookie. 

Using a piece of middleware, the JWT cookie is decoded and the userId stored inside is requested from the database. 

If the token exists and corresponds to a user in the database, the details of the user (id, name, email) are stored in the express request object and passed on to the specified controller function. 

If not, access to the controller function is denied as the user does not have a valid token.

The SQL queries that interact with any pieces of data that belong to user are checked against the stored userId rather than a specified userId, ensuring that users can only interact with data belonging to them.

**Handling Workouts, Exercise and Sets**

Once the user is logged in they can then access the endpoints related to workouts, exercises and sets. The user can perform CRUD actions by submitting HTTP requests to the correct endpoint.

Each entry in the workouts table requires two pieces of information: a workout name, and the user it belongs to. This `owner` field is a foreign key referring to the userId of the user submitting the request.

First the user sends a HTTP POST request to `/api/workouts` specifiying a name for the workout such as 'Arms' or 'Leg Day' in the request body.

The controller function will then retrieve the userId from the user object stored in the request object by the authentication middleware.

An SQL query is then created to insert this data into the table for workouts containing both the workout name and owner id. 

The user can then perform the Read, Update and Delete actions via HTTP requests to the relevant endpoints.

A similar pattern is followed for the remaining tables in the database regarding foreign keys and the data they hold.

Creating an exercise requires specifying the name of the exercise, the muscle group the exercise works (biceps, legs, back, etc) and the id of workout that it belongs to (foreign key).

Creating a set requires specifying the weight, number of reps performed and the id of the exercise it belongs to (foreign key).

Each of these tables also have a field for time created, this is used later in the frontend for displaying the most recent data first.

**Backend Error Handling**

It is necessary to carry out error handling for each of the SQL queries as disconnection from the server or invalid requests can throw errors which must be handled accordingly. 

In this case I used `try catch` statements to catch errors. The response status is then updated to reflect the error state and an error is thrown with an intelligible message such as `Could not find workout` or `Invalid credentials`
