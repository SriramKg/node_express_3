
# Virtual Event Management Backend System

## Overview

This backend system is developed for a virtual event management platform, focusing on user registration, event scheduling, and participant management. It uses Node.js with Express.js and employs in-memory data structures to manage data. The system also features secure user authentication using bcrypt for password hashing and JWT for session management.

## Features

- **User Authentication**: Secure registration and login using bcrypt and JWT.
- **Event Management**: Create, update, and delete events with details such as date, time, description, and participants.
- **Participant Management**: Users can register for events and manage their registrations.
- **Asynchronous Operations**: Email notifications are sent asynchronously upon successful registration.

## Project Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/) (v6 or above)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/SriramKg/node_express_3.git
    cd node_express_3
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Run the server:
    ```bash
    npm run start
    ```

### Testing

To run tests:
```bash
npm run test
```

## API Endpoints

### User Authentication

| Method | Endpoint          | Description                                                   |
|--------|-------------------|---------------------------------------------------------------|
| POST   | `/register`       | Registers a new user. Requires a `username`, `email`, `password`, `roles`, `number` and `gender`. |
| POST   | `/login`          | Logs in an existing user. Requires `email` and `password`. Returns a JWT. |

#### POST `/register`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "username": "John Doe",
    "email": "johndoe@example.com",
    "password": "yourpassword",
    "roles" : ["user"],
    "number" : 8015xxxxxxx,
    "gender" : "Male"
  }
  ```
- **Response**:
  - **201 Created**: User registered successfully.
  - **400 Bad Request**: Email already exists or invalid input.
  - Sends a welcome email asynchronously upon successful registration.

#### POST `/login`
- **Description**: Logs in an existing user.
- **Request Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "yourpassword"
  }
  ```
- **Response**:
  - **200 OK**: Returns a JWT token for authenticated sessions.
  - **401 Unauthorized**: Incorrect email or password.

### Event Management

| Method | Endpoint              | Description                                                                 |
|--------|-----------------------|-----------------------------------------------------------------------------|
| GET    | `/events`             | Retrieves a list of all events.                                             |
| POST   | `/events/create`      | Creates a new event. Requires authentication.                               |
| GET    | `/events/:id`         | Retrieves details of a specific event by ID.                                |
| PUT    | `/events/update/:id`  | Updates an existing event. Requires authentication and authorization.       |
| DELETE | `/events/delete/:id`  | Deletes an existing event. Requires authentication and authorization.       |

#### POST `/events`
- **Description**: Creates a new event. Only accessible by authenticated users (event organizers).
- **Request Body**:
  ```json
  {
    "eventtitle": "Mongoose Workshop",
    "description": "A workshop to learn about Mongoose and MongoDB.",
    "date": "2024-08-20",
    "location": "Chennai",
    "participants": []
  }
  ```
- **Response**:
  - **201 Created**: Event created successfully.
  - **401 Unauthorized**: User is not authenticated.

#### GET `/events`
- **Description**: Retrieves a list of all events.
- **Response**:
  ```json
  [
    {
      "id": "1",
      "eventtitle": "Tech Conference",
      "date": "2024-09-01",
      "time": "10:00 AM",
      "description": "A conference on the latest in technology.",
      "participants": ["johndoe@example.com"]
    },
    ...
  ]
  ```

#### GET `/events/:id`
- **Description**: Retrieves details of a specific event by ID.
- **Response**:
  ```json
  {
    "id": "1",
    "eventtitle": "Tech Conference",
    "date": "2024-09-01",
    "time": "10:00 AM",
    "description": "A conference on the latest in technology.",
    "participants": ["johndoe@example.com"]
  }
  ```

#### PUT `/events/:id`
- **Description**: Updates an existing event. Only accessible by authenticated users (event organizers).
- **Request Body** (any field can be updated):
  ```json
  {
    "eventtitle": "Updated Tech Conference",
    "date": "2024-09-02",
    "time": "11:00 AM",
    "description": "Updated details for the tech conference."
  }
  ```
- **Response**:
  - **200 OK**: Event updated successfully.
  - **401 Unauthorized**: User is not authenticated.
  - **403 Forbidden**: User is not authorized to update the event.

#### DELETE `/events/:id`
- **Description**: Deletes an existing event. Only accessible by authenticated users (event organizers).
- **Response**:
  - **200 OK**: Event deleted successfully.
  - **401 Unauthorized**: User is not authenticated.
  - **403 Forbidden**: User is not authorized to delete the event.

### Participant Management

| Method | Endpoint                          | Description                                               |
|--------|-----------------------------------|-----------------------------------------------------------|
| POST   | `/events/:id/register`            | Registers the authenticated user for a specific event.    |

#### POST `/events/:id/register`
- **Description**: Registers the authenticated user for a specific event.
- **Response**:
  - **200 OK**: User registered for the event successfully.
  - **401 Unauthorized**: User is not authenticated.
  - **404 Not Found**: Event not found.

## MongoDB

The system uses MongoDB database to manage users, events, and participant registrations.

### Example Data Structure

#### Users
```json
{
  "users": [
    {
      "id": "1",
      "username": "John Doe",
      "email": "johndoe@example.com",
      "password": "hashedpassword",
      "role": ["admin"],
      "number": "1234567890",
      "gender": "Male",
    }
  ]
}
```

#### Events
```json
{
  "events": [
    {
      "id": "1",
      "eventtitle": "Tech Conference",
      "date": "2024-09-01",
      "time": "10:00 AM",
      "description": "A conference on the latest in technology.",
      "participants": ["johndoe@example.com"]
    }
  ]
}
```

## Security

- **Password Hashing**: User passwords are hashed using bcrypt.
- **JWT Authentication**: JWT tokens are used for secure user sessions.
- **Authorization**: Event management endpoints are restricted to event organizers only.

## Asynchronous Operations

The system uses async/await and Promises to handle asynchronous operations, such as sending email notifications upon successful user registration.

## Conclusion

This project demonstrates a basic implementation of a backend system for managing virtual events, focusing on user authentication, event management, and participant registration. The use of in-memory data structures makes it suitable for small-scale applications, while the integration of bcrypt and JWT ensures secure user management.

Feel free to extend this project by integrating a database, enhancing the authorization mechanism, or adding more features like event reminders, notifications, and more.

For more information, please refer to the [API documentation](#api-endpoints).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.