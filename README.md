# MERN Whiteboard Project

## Project Overview

The MERN Whiteboard Project is a web application that allows users to create, manage, and view drawings on a virtual whiteboard. The project is built using the MERN stack (MongoDB, Express.js, React, Node.js) and provides RESTful API endpoints to handle drawing data.

## Table of Contents

- [Overview](#overview)
- [Frontend](#frontend)
  - [Technologies Used](#technologies-used)
  - [Components](#components)
  - [Setup](#setup)
  - [Usage](#usage)
- [Backend](#backend)
  - [Technologies Used](#technologies-used-1)
  - [API Endpoints](#api-endpoints)
  - [Setup](#setup-1)
  - [Usage](#usage-1)
- [Contributing](#contributing)
- [License](#license)

## Backend

### Features

- **Add Drawings**: Create new drawings with a name and elements.
- **View Drawings**: Retrieve all drawings or a specific drawing by ID.
- **Update Drawings**: Modify existing drawings.
- **Delete Drawings**: Remove drawings from the database.

### Technologies Used

- **MongoDB**: NoSQL database for storing drawing data.
- **Express.js**: Web framework for building the RESTful API.
- **Node.js**: JavaScript runtime for the server-side logic.
- **Mongoose**: ODM library for MongoDB, used for data modeling and schema validation.

### Installation Instructions

1. **Clone the Repository**:

   ```
   git clone https://github.com/Alisadaintanvir/MERN-Interview-Test.git
   ```

2. **Navigate to the Backend Directory**:

   ```
   cd backend
   ```

3. **Install Dependencies**:

   ```
   npm install
   ```

4. **Set Up Environment Variables**:

   Create a `.env` file in the `backend` directory with the following content:

   ```plaintext
   MONGODB_URI=your_mongodb_connection_string

   ```

5. **Run the Server**:

   ```
   nodemon server.js
   ```

   The server will start on port 5000 by default.

### API Endpoints

#### 1. Add Drawing

- **Endpoint**: `POST /api/whiteboard/add`
- **Description**: Adds a new drawing.
- **Request Body**:

  ```json
  {
    "name": "Drawing Name",
    "elements": [
      {
        "type": "rectangle",
        "x": 10,
        "y": 10,
        "width": 100,
        "height": 50,
        "color": "#FF0000"
      }
    ]
  }
  ```

- **Responses**:
  - `201 Created`: Successfully created drawing.
  - `400 Bad Request`: Missing required fields.
  - `409 Conflict`: Drawing with the same name already exists.

#### 2. Get All Drawings

- **Endpoint**: `GET /api/whiteboard/`
- **Description**: Retrieves all drawings.
- **Responses**:
  - `200 OK`: Returns a list of drawings.
  - `404 Not Found`: No drawings found.

#### 3. Get Drawing by ID

- **Endpoint**: `GET /api/whiteboard/:id`
- **Description**: Retrieves a specific drawing by ID.
- **Parameters**:
  - `id`: The ID of the drawing to retrieve.
- **Responses**:
  - `200 OK`: Returns the drawing.
  - `404 Not Found`: Drawing not found.

#### 4. Update Drawing

- **Endpoint**: `PATCH /api/whiteboard/:id`
- **Description**: Updates an existing drawing.
- **Parameters**:
  - `id`: The ID of the drawing to update.
- **Request Body**:

  ```json
  {
    "name": "Updated Drawing Name",
    "elements": [
      {
        "type": "line",
        "x": 20,
        "y": 20,
        "points": [10, 10, 50, 50],
        "color": "#0000FF"
      }
    ]
  }
  ```

- **Responses**:
  - `200 OK`: Successfully updated drawing.
  - `404 Not Found`: Drawing not found.

#### 5. Delete Drawing

- **Endpoint**: `DELETE /api/whiteboard/:id`
- **Description**: Deletes a specific drawing by ID.
- **Parameters**:
  - `id`: The ID of the drawing to delete.
- **Responses**:
  - `200 OK`: Drawing deleted successfully.
  - `404 Not Found`: Drawing not found.

### Sample Data

Below are examples of sample data for the `Drawing` model:

```json
[
  {
    "_id": "66e85f01133442836c870f56",
    "name": "Simple Shapes",
    "elements": [
      {
        "type": "rectangle",
        "x": 552,
        "y": 342,
        "width": 278,
        "height": 145
      },
      {
        "type": "circle",
        "x": 1156,
        "y": 191,
        "radius": 172.19
      }
    ]
  },
  {
    "_id": "66e85f02133442836c870f59",
    "name": "Text and Line",
    "elements": [
      {
        "type": "text",
        "x": 300,
        "y": 200,
        "text": "Hello, Whiteboard!",
        "fontSize": 24,
        "color": "#000000"
      },
      {
        "type": "line",
        "x": 0,
        "y": 0,
        "points": [300, 250, 500, 400],
        "color": "#000000",
        "strokeWidth": 2
      }
    ]
  }
]
```
