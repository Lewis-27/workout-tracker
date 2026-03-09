# Workout Tracker #
**Link to project:** https://workouts.lewis-miller.dev/

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
Once the database was working correctly locally I then migrated it to the cloud host Neon where the database could be accessed using a connection string.

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

### Frontend

For the frontend of the project I used React. The contents of the page are structured and styled using `shadcn` and `tailwindcss`. For routing between pages I used the package `react-router-dom`. I used a combination of `axios` and `tanstack-query` to fetch data from the backend API and I used the state manager `zustand` to store the user details in a global state store.

**Structure**

Each endpoint for the site such as `/`, `/login` and `/workout/1` uses the react router to render a React component which acts as the desired page such as the home page, login/logout page, signup page and individual pages for each workout.

The contents of each page is then made up of further React components such as the header, forms for signing up and logging in and cards representing workouts, exercises and sets.

These components (such as buttons, cards, inputs and spinners) are themselves made from components from the ShadCN component library styled using tailwind classes. This helps to give the website a consistent style while also maintaining structure and efficiency as code can be reused throughout the project.

**Data Handling**

In order to populate the page with data and allow the user to interact with the data it is necessary to interact with the backend API I created.

For the purpose of development, by setting up a proxy in the vite settings for react, you can send HTTP requests from within the react application to endpoints such as `POST /api/users` to carry out this interaction.

However in the production build of the app, the frontend is server as a static folder. As a result requests can still be made to the same endpoints without the need for a proxy server.

I used the library `axios` to perform these specific fetch requests by supplying a method, endpoint and body. 

In order to facilitate these queries I used the library `Tanstack Query`. This library allows me to call a fetch request while monitoring the state of the request (pending, error, success) and handle the data it returns correctly. 

Part of handling the data is ensuring that if a change is made to the backend data such as adding a workout or changing a user's name, the data on the frontend is reloaded as needed to ensure only the most up to date data is rendered for the user.

Tanstack Query works by declaring a query/mutation function with instructions on what axios request to make (including what endpoint and body data to use) and how to handle the data that is returned. This query/mutation function is then called within the react component either as part of rendering the page in the case of data fetching, or as a response to a user action in the case of a data mutation.

Data that may be used throughout the application such as the data of the currently logged in user is stored in a global state store using the `zustand` library.

I declared a state object to hold the currently logged in user using zustand's store feature which is set to the data returned when a user successfully logs in and then is updated/removed when a user edits their data or logs out.

This user data is then used for things such as populating the header with the user's name.

**Frontend Error Handling**

There are a number of errors that can be presented to users as they navigate the site. One simple error is navigating to an endpoint with no designated page to render. In this case I created a fallback page that informs the user that the page they attempted to go to does not exist and allows them to navigate either to the previous page or the home page.

The main source of errors for the user comes with interacting with the backend. 

The use of Tanstack Query allows me to monitor requests for if they enter into error states, in this case I can relay this info back to the user using toasts.

These toasts contain messages, that inform the user of the nature of the error such as 'Error fetching workouts' or 'Failed to authorise user' allowing the user to retry whatever action caused the error.

### Deployment
Once I had completed the development of the site it was time to prepare it for deployment.

In order to achieve this I removed the vite dev server and instead used the build command to turn the vite project into a static folder containing the files. I then changed the backend so that it served the static folder on endpoints such as `/login` so that the entire sit can be reached from the same port.

I then used docker to containerise the project using a Dockerfile containing the build instructions and docker compose via the compose.yaml file to initialise the environment abnd build the container.

Once the app could be successfully deployed from the container I then used the host railway to deploy the site from the GitHub repository. As a result of this the app is automatically redeployed whenever a change is push to the GitHub repo. As part of the deployment I had to feed the sensitive environment variables into railway such as the connection string for the database.

I then attached the railway hosted site to the workouts.lewis-miller.dev subdomain of my website allowing the site to be public accessed.
