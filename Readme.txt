# Task Management API

A simple RESTful API for managing tasks built with Node.js and Express.js. This project demonstrates CRUD operations, input validation, error handling, and testing using tools like Postman or curl.

## Features
- **Create** tasks with a title and description.
- **Read** tasks (all tasks or a specific task by ID).
- **Update** task details (title, description, or completion status).
- **Delete** tasks by ID.
- In-memory data storage.
- Basic error handling and input validation.

## Prerequisites
- [Node.js](https://nodejs.org/) installed.
- A package manager (npm).

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   The API will run at `http://localhost:3000`.

## Endpoints

### Base URL: `http://localhost:3000`

### 1. **Create a Task**
**POST** `/tasks`
- Request Body:
  ```json
  {
    "title": "Task Title",
    "description": "Task Description"
  }
  ```
- Response:
  ```json
  {
    "id": 1,
    "title": "Task Title",
    "description": "Task Description",
    "completed": false
  }
  ```

### 2. **Get All Tasks**
**GET** `/tasks`
- Response:
  ```json
  [
    {
      "id": 1,
      "title": "Task Title",
      "description": "Task Description",
      "completed": false
    }
  ]
  ```

### 3. **Get a Task by ID**
**GET** `/tasks/:id`
- Response:
  ```json
  {
    "id": 1,
    "title": "Task Title",
    "description": "Task Description",
    "completed": false
  }
  ```

### 4. **Update a Task**
**PUT** `/tasks/:id`
- Request Body (any field is optional):
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description",
    "completed": true
  }
  ```
- Response:
  ```json
  {
    "id": 1,
    "title": "Updated Title",
    "description": "Updated Description",
    "completed": true
  }
  ```

### 5. **Delete a Task**
**DELETE** `/tasks/:id`
- Response: `204 No Content`

## Error Handling
- `400 Bad Request`: Invalid input data.
- `404 Not Found`: Task not found.
- `500 Internal Server Error`: General server error.

## Testing the API
### Using Postman:
1. Import the collection or manually set up requests.
2. Test each endpoint with the sample payloads.

## License
This project is open-source and available under the MIT License.

