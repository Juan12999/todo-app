# Todo App with Vite, React, TypeScript, Node.js, and Express

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Running the Application](#running-the-application)

## Project Overview

This Todo application is divided into two parts:

1. **Frontend**: Built with React, TypeScript, and Vite for a fast and modern development experience.
2. **Backend**: A RESTful API created with Node.js and Express to handle CRUD operations for the Todo tasks.

## Technologies Used

- **Frontend**:
  - React
  - TypeScript
  - Vite
  - Axios (for HTTP requests)

- **Backend**:
  - Node.js
  - Express
  - MongoDB (for storing todo tasks)

## Frontend Setup

### Requirements

- Node.js 
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Juan12999/todo-app.git
   cd todo-app/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   This will run the frontend application on `http://localhost:5173`.

## Backend Setup

### Requirements

- Node.js
- MongoDB (locally or via a cloud provider like MongoDB Atlas)

### Installation

1. Navigate to the backend folder:
   ```bash
   cd todo-app/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the `backend` folder with the following content:
   ```
   MONGO_URI=mongodb://localhost:27017/todoapp  # Replace with your MongoDB URI
   JWT_SECRET=your_jwt_secret_here              # Secret key for JWT authentication
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

   This will run the backend API on `http://localhost:5000`.

## Running the Application

Make sure both the frontend and backend servers are running simultaneously:

1. Frontend: `http://localhost:5173`
2. Backend API: `http://localhost:5000`

You should now be able to interact with the Todo app, create, update, and delete tasks. The frontend will communicate with the backend API to fetch, create, or delete tasks.
