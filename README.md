# Social Media Microservices Project

This project is a microservices-based social media application built with Node.js and MongoDB. It consists of multiple services that handle various functionalities like user management, discussions, comments, likes, search, and authentication.

## Services

- **User Service**: Manages user creation, updates, deletion, and follows.
- **Discussion Service**: Manages the creation, update, deletion of discussions, and fetching discussions based on tags or text.
- **Comment Service**: Manages comments on discussions, including creating, updating, deleting, and replying to comments.
- **Like Service**: Manages likes on discussions and comments.
- **Search Service**: Provides search functionalities for users and discussions.
- **Auth Service**: Manages user signup, login, and token validation.

## Architecture

Each service runs independently and can be scaled separately. The services communicate with each other using REST APIs.

### User Service

**Base URL**: `http://localhost:3000`

#### Endpoints
- **Create User**
  - **URL**: `/users`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "mobileNo": "1234567890",
      "email": "john.doe@example.com"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "60d0fe4f5311236168a109ca",
      "name": "John Doe",
      "mobileNo": "1234567890",
      "email": "john.doe@example.com",
      "following": []
    }
    ```

- **Update User**
  - **URL**: `/users/:id`
  - **Method**: `PUT`
  - **Request Body**:
    ```json
    {
      "name": "Jane Doe"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "60d0fe4f5311236168a109ca",
      "name": "Jane Doe",
      "mobileNo": "1234567890",
      "email": "john.doe@example.com",
      "following": []
    }
    ```

- **Delete User**
  - **URL**: `/users/:id`
  - **Method**: `DELETE`
  - **Response**: `204 No Content`

- **Get Users**
  - **URL**: `/users`
  - **Method**: `GET`
  - **Response**:
    ```json
    [
      {
        "_id": "60d0fe4f5311236168a109ca",
        "name": "Jane Doe",
        "mobileNo": "1234567890",
        "email": "john.doe@example.com",
        "following": []
      }
    ]
    ```

- **Search User by Name**
  - **URL**: `/users/search`
  - **Method**: `GET`
  - **Query Parameters**: `name`
  - **Response**:
    ```json
    [
      {
        "_id": "60d0fe4f5311236168a109ca",
        "name": "Jane Doe",
        "mobileNo": "1234567890",
        "email": "john.doe@example.com",
        "following": []
      }
    ]
    ```

- **Follow/Unfollow User**
  - **URL**: `/users/:id/follow`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "userIdToFollow": "60d0fe4f5311236168a109cb"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "60d0fe4f5311236168a109ca",
      "name": "Jane Doe",
      "mobileNo": "1234567890",
      "email": "john.doe@example.com",
      "following": ["60d0fe4f5311236168a109cb"]
    }
    ```

### Discussion Service

**Base URL**: `http://localhost:3002`

#### Endpoints
- **Create Discussion**
  - **URL**: `/discussions`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "text": "This is a discussion",
      "image": "image_url",
      "hashTags": ["#tag1", "#tag2"],
      "userId": "60d0fe4f5311236168a109ca"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "60d1f9875311236168a109cc",
      "text": "This is a discussion",
      "image": "image_url",
      "hashTags": ["#tag1", "#tag2"],
      "createdOn": "2024-07-02T12:00:00.000Z",
      "viewCount": 0,
      "userId": "60d0fe4f5311236168a109ca"
    }
    ```

- **Update Discussion**
  - **URL**: `/discussions/:id`
  - **Method**: `PUT`
  - **Request Body**:
    ```json
    {
      "text": "Updated discussion text"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "60d1f9875311236168a109cc",
      "text": "Updated discussion text",
      "image": "image_url",
      "hashTags": ["#tag1", "#tag2"],
      "createdOn": "2024-07-02T12:00:00.000Z",
      "viewCount": 0,
      "userId": "60d0fe4f5311236168a109ca"
    }
    ```

- **Delete Discussion**
  - **URL**: `/discussions/:id`
  - **Method**: `DELETE`
  - **Response**: `204 No Content`

- **Get List of Discussions by Tags**
  - **URL**: `/discussions/tags`
  - **Method**: `GET`
  - **Query Parameters**: `tags`
  - **Response**:
    ```json
    [
      {
        "_id": "60d1f9875311236168a109cc",
        "text": "This is a discussion",
        "image": "image_url",
        "hashTags": ["#tag1", "#tag2"],
        "createdOn": "2024-07-02T12:00:00.000Z",
        "viewCount": 0,
        "userId": "60d0fe4f5311236168a109ca"
      }
    ]
    ```

- **Get List of Discussions by Text**
  - **URL**: `/discussions/search`
  - **Method**: `GET`
  - **Query Parameters**: `text`
  - **Response**:
    ```json
    [
      {
        "_id": "60d1f9875311236168a109cc",
        "text": "This is a discussion",
        "image": "image_url",
        "hashTags": ["#tag1", "#tag2"],
        "createdOn": "2024-07-02T12:00:00.000Z",
        "viewCount": 0,
        "userId": "60d0fe4f5311236168a109ca"
      }
    ]
    ```

### Comment Service

**Base URL**: `http://localhost:3003`

#### Endpoints
- **Add Comment**
  - **URL**: `/discussions/:discussionId/comments`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "userId": "60d0fe4f5311236168a109ca",
      "text": "This is a comment"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "60d1fa4f5311236168a109cd",
      "discussionId": "60d1f9875311236168a109cc",
      "userId": "60d0fe4f5311236168a109ca",
      "text": "This is a comment",
      "createdOn": "2024-07-02T12:00:00.000Z",
      "likes": [],
      "replies": []
    }
    ```

- **Update Comment**
  - **URL**: `/comments/:id`
  - **Method**: `PUT`
  - **Request Body**:
    ```json
    {
      "text": "Updated comment text"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "60d1fa4f5311236168a109cd",
      "discussionId": "60d1f9875311236168a109cc",
      "userId": "60d0fe4f5311236168a109ca",
      "text": "Updated comment text",
      "createdOn": "2024-07-02T12:00:00.000Z",
      "likes": [],
      "replies": []
    }
    ```

- **Delete Comment**
  - **URL**: `/comments/:id`
  - **Method**: `DELETE`
  - **Response**: `204 No Content`

### Like Service

**Base URL**: `http://localhost:3004`

#### Endpoints
- **Like/Unlike Discussion**
  - **URL**: `/discussions/:discussionId/like`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "userId": "60d0fe4f5311236168a109ca"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "60d1f9875311236168a109cc",
      "text": "This is a discussion",
      "image": "image_url",
      "hashTags": ["#tag1", "#tag2"],
      "createdOn": "2024-07-02T12:00:00.000Z",
      "viewCount": 0,
      "likes": ["60d0fe4f5311236168a109ca"],
      "userId": "60d0fe4f5311236168a109ca"
    }
    ```

- **Like/Unlike Comment**
  - **URL**: `/comments/:commentId/like`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "userId": "60d0fe4f5311236168a109ca"
    }
    ```
  - **Response**:
    ```json
    {
      "_id": "60d1fa4f5311236168a109cd",
      "discussionId": "60d1f9875311236168a109cc",
      "userId": "60d0fe4f5311236168a109ca",
      "text": "This is a comment",
      "createdOn": "2024-07-02T12:00:00.000Z",
      "likes": ["60d0fe4f5311236168a109ca"],
      "replies": []
    }
    ```

### Search Service

**Base URL**: `http://localhost:3005`

#### Endpoints
- **Search Users**
  - **URL**: `/users`
  - **Method**: `GET`
  - **Query Parameters**: `query`
  - **Response**:
    ```json
    [
      {
        "_id": "60d0fe4f5311236168a109ca",
        "name": "Jane Doe",
        "mobileNo": "1234567890",
        "email": "john.doe@example.com"
      }
    ]
    ```

- **Search Discussions**
  - **URL**: `/discussions`
  - **Method**: `GET`
  - **Query Parameters**: `query`
  - **Response**:
    ```json
    [
      {
        "_id": "60d1f9875311236168a109cc",
        "text": "This is a discussion",
        "image": "image_url",
        "hashTags": ["#tag1", "#tag2"],
        "createdOn": "2024-07-02T12:00:00.000Z",
        "viewCount": 0,
        "userId": "60d0fe4f5311236168a109ca"
      }
    ]
    ```

### Auth Service

**Base URL**: `http://localhost:3006`

#### Endpoints
- **Signup**
  - **URL**: `/signup`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "User created successfully",
      "token": "jwt-token"
    }
    ```

- **Login**
  - **URL**: `/login`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Login successful",
      "token": "jwt-token"
    }
    ```

- **Validate Token**
  - **URL**: `/validate`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "token": "jwt-token"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Token is valid"
    }
    ```

## Running the Services

Each service can be run independently. Navigate to the respective service directory and use the following commands:

1. Install dependencies:
   ```sh
   npm install
