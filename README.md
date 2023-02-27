## **Hello there 👋**

# Integrify Coding Challenge 
## Node.js assignment

The goal is to implement an **RESTful** api for keeping track of every users' **ToDo** tasks.

As per requirement, I have implemented and API with the use of **Node.js**, **Express.js Framework** and **Sequelize ORM**:

The main and only actor of this API is the **User** who has **access** to the ToDo tasks that has submitted on his own.

The **User** possesses these fields as defined in our /db/models directory.

**User**:

- Id: Unique identifier
- Email: Email address
- Password: Hash of the password
- Created timestamp: When the user is created
- Created timestamp: When the user is created

The **ToDo** object, is the core object of this API which describes a user's task and it possesses these fields:

**Todo**

- Id: Unique identifier
- Name: Name of the todo item
- Description (optional): Description of the toto item
- User id: Id of the user who owns this todo item
- Created timestamp: When the item is created
- Updated timestamp: When the item is last updated
- Status: An enum of either: NotStarted, OnGoing, Completed

## Task's core objective
Our task is to implement a REST API with the below endpoints in mind:

- **POST** */api/v1/signup*: Sign up as an user of the system, using email & password
- **POST** */api/v1/signin*: Sign in using email & password. The system will return the JWT token that can be used to call the APIs that follow
- **PUT** */api/v1/changePassword*: Change user’s password
- **GET** */api/v1/todos?status=[status]*: Get a list of todo items. Optionally, a status query param can be included to return only items of specific status. If not present, return all items
- **POST** */api/v1/todos*: Create a new todo item
- **PUT** */api/v1/todos/:id*: Update a todo item
- **DELETE** */api/v1/todos/:id*: Delete a todo item



## Techologies

- Docker
- Node.js environment
- Express.js framework
- Sequelize ORM
- jwt, bcrypt for token signing/verifying and hashing passwords
- swagger-autogen for generating openapi and swagger API specification files
- swagger-ui for presenting our swagger file through docs pages



## Prerequisites
You should have [**Docker**](https://docker.io)  installed in your local machine and [**docker-compose**](https://docs.docker.com/compose/).

## Helpful extra software
**For dev purposes:**

A fully setup **Node.js** and **npm**  will help you if you need to run this application directly from your host machine.
However, our Node.js app is fully containerized so these tools are not mandatory for you to run this app.

## Installation

Install  [**Docker**](https://docker.io) in your local machine and [**docker-compose**](https://docs.docker.com/compose/) if you don't have them alredy in your local machine.

**Clone repository**
git clone https://github.com/ipanagiotopoulos/integrify_to_do_app


## Docker containers structure and code

**Workspace** is located under **integrify_to_do_app** folder.

This stack contains two containers

```version: '3.8'
services:
  integrify_db:
    image: postgres:14.1-alpine
    restart: always
    container_name: INTEGRIFY_DB
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    ports:
      - '5432:5432'
    volumes:
      - db:/var/lib/postgresql/data
  integrify_to_do_app:
      environment:
        - NODE_ENV=development
      build:
        context: ./integrify_code
        dockerfile: Dockerfile
      expose:
        -  "${NODE_JS_EXPOSE_PORT}"
      ports:
        - "${NODE_JS_EXPOSE_PORT}:${NODE_JS_INTERNAL_PORT}"
      command: npm start
      depends_on:
      - integrify_db
volumes:
  db:
    driver: local
```

## integrify_db 
**integrify_db** is where our app's PostgreSQL database is hosted

## integrify_to_do_app 
**internships_web** is a container based on node:lts-alpine container which hosts our node.js app(REST API application)
**/integrify_to_do_app/integrify_code** is the main workspace folder for our Node.js application.
For this containerized app, you can check the Dockerfile file under the integrify_code folder.
 


## Deploy and Run 
 
 
 1. head to **integrify_to_do_app** folder

 2. cp example.env .env

 
  2.1 set your postgres db creds
  
     ```
       POSTGRES_USER = <YOUR ADMIN>
       POSTGRES_PASSWORD = <YOUR PASSWORD>
       POSTGRES_DB =  <YOUR_DB_NAME>
       NODE_JS_EXPOSE_PORT = <YOUR_INTERNAL_PORT>
       NODE_JS_INTERNAL_PORT = <YOUR_EXTERNAL_PORT>
     ``` 
     
     You have to your values in the fields that have the <> sign
    

 3. cd integrify_code
  
 4. cp example.env .env
  
   4.1 set the correct value in the env folder
   
   ```
     SECRET_KEY = xozfre!#423#@
     PORT = <your port number>
     DATABASE_TYPE= postgres
     DATABASE_USER= <your_username>
     DATABASE_HOST= integrify_db
     DATABASE_NAME= <your_database_name> 
     DATABASE_PORT=5432
     DATABASE_PASSWORD= <your_password>
     BASE_API_ENDPOINT= "/api"
     BASE_API_VERSION= "/v1"
   ``` 
     
   We always recommend 5432 for the PostgreSQL database container 
  
   **Otherwise** you will have to change the port in the **docker-compose.yml** under the root folder of your local repository
     
   Also it is important to keep the  DATABASE_HOST value, since it's named after the service name which has been declared in the **docker-compose** file
   
   The **BASE_API_ENDPOINT** and **BASE_API_VERSION** need to remain the same in order to set all the new routes under the **/api/v1** path,
   
   but for future-proofing this app we have used these staging variables.

 5. run docker-compose up --build -d in the **root** folder


## USAGE

  Our API is located under the /api/v1 path according to the  recommended configuration scheme, and you can test our endpoints with the help of tools such
  as Postman or more preferrably by using the app's swagger-ui page under the **/api/v1/doc** path or by downloading the swagger.json file of this API which is
  served under **/api/v1//api-docs/swagger.json**

## License
[MIT](https://choosealicense.com/licenses/mit/)










 
