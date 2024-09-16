# MERN Whiteboard Project

A simple web application that allows users to create, view, and manage drawings on a virtual whiteboard. The app supports drawing various shapes and adding text annotations. Users can save their drawings, view a list of saved drawings, and update or delete them.

## Live Demo

Check out the live demo of the project here: [Live Demo](https://mern-interview-test-frontend-sooty.vercel.app/)

## Table of Contents

- [Overview](#project-overview)
- [Backend](#backend)
  - [Technologies Used](#technologies-used)
  - [API Endpoints](#api-endpoints)
  - [Setup](#installation-instructions)
- [Frontend](#frontend)
  - [Technologies Used](#technologies-used-1)
  - [Components](#components)
  - [Setup](#setup)
  - [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The MERN Whiteboard Project is a web application that allows users to create, manage, and view drawings on a virtual whiteboard. The project is built using the MERN stack (MongoDB, Express.js, React, Node.js) and provides RESTful API endpoints to handle drawing data.

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

## Frontend

### Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React Router DOM**: For client-side routing.
- **React Konva**: A library to work with canvas in React applications.
- **Axios**: For making API requests.
- **React Toastify**: For showing notifications.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

### Components

- **App.jsx**: Main application component that sets up routing and includes global configurations like notifications using React Toastify.
- **HomePage.jsx**: Displays a list of saved drawings, allowing users to view or delete them.
- **Whiteboard.jsx**: The main drawing interface, allowing users to create and update drawings. Includes a modal for saving and updating the drawings.

### Setup

1. **Install Dependencies**

   First, navigate to the frontend directory and install all required dependencies:

   ```
   npm install
   ```

2. **Run the Development Server**

   To start the React development server, use:

   ```
   npm run dev
   ```

   This will launch the app in your default web browser at "http://localhost:5173".

   ## Usage

### Drawing on the Whiteboard

1. **Visit the Whiteboard Page**

   Navigate to the `/whiteboard` route to start drawing.

2. **Choose Your Drawing Tool**

   Use the controls on the right side of the whiteboard to select the shape you want to draw:

   - **Line**
   - **Rectangle**
   - **Circle**
   - **Text**

3. **Draw on the Canvas**

   Click and drag on the canvas to create your drawing.

4. **Change Drawing Position**

   Click select button to move the drawing position.

5. **Save Your Drawing**

   Click the "Save" button to save the drawing. If you are editing an existing drawing, it will be updated with the new changes.

### Viewing and Editing Saved Drawings

1. **Navigate to the Homepage**

   Go to the homepage at `/` to view all your saved drawings.

2. **Edit a Drawing**

   Click on any drawing to open it in the whiteboard for editing.

3. **Update the Drawing**

   Make any desired changes and click "Update" to save the changes to the drawing.

## Contributing

I welcome contributions! If you find a bug or have a feature request, feel free to submit a pull request or open an issue.

### Guidelines

- **Code Quality**: Ensure your code follows general guidelines of clean and readable code.
- **Testing**: Include tests for your changes if applicable.
- **Documentation**: Update documentation to reflect any changes made.

### How to Contribute

1. **Fork the Repository**: Create a fork of the repository on GitHub.
2. **Clone Your Fork**: Clone your fork to your local machine.
3. **Create a Branch**: Create a new branch for your changes.
4. **Make Changes**: Implement your changes or fixes.
5. **Commit Your Changes**: Commit your changes with a clear message.
6. **Push Your Changes**: Push your changes to your fork on GitHub.
7. **Submit a Pull Request**: Open a pull request to the main repository with a description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
