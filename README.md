# UniSpace

UniSpace is a web-based educational platform designed to streamline classroom management and communication between teachers and students. The application centralizes course resources, announcements, and scheduling. This repository contains both the frontend interface and the backend API.

## Project Structure

The project is split into two main environments:
- `local/frontend/`: The client-side application built with HTML, CSS, and Vanilla JavaScript.
- `local/backend/`: A RESTful API built on Node.js and Express, utilizing MongoDB for data persistence.

## Features

- **User Roles & Authentication**: Separate flows for Teachers and Students utilizing JWT and Google OAuth.
- **Classroom Management**: Teachers can create, organize, and archive classroom modules. Students can join using auto-generated, randomized course codes.
- **Real-Time Communication**: Socket.io integration to handle live announcements and direct chat routing.
- **Resource Sharing**: Infrastructure for uploading and distributing materials based on course batch and section parameters.

## Technology Stack

**Frontend:**
- HTML5, Vanilla JavaScript, and Custom CSS 
- Axios for HTTP requests
- `serve` for local development hosting

**Backend:**
- Node.js / Express
- MongoDB with Mongoose (Schemas for Users, Classrooms, Routines, and Resources)
- JSON Web Tokens (JWT) & bcryptjs for authentication security
- Socket.IO for WebSockets

## Local Development Setup

### 1. Environment Config
Ensure you have a MongoDB instance running locally or a cluster URI. Add your database connection string and secret keys to a `.env` file inside `local/backend/`.

Example `.env` structure:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/unispace
JWT_SECRET=your_jwt_secret_here
```

### 2. Backend Server
Navigate to the backend directory, install the node modules, and start the server.

```bash
cd local/backend
npm install
npm run dev
# Alternatively: node src/server.js
```
The API should now be running (default port 5000).

### 3. Frontend Client
Navigate to the frontend directory, install the dependencies, and serve the static files from the `public` folder.

```bash
cd local/frontend
npm install
npm start
```
By default, the `serve` library will host the frontend on port 3000. Open `http://localhost:3000` in your browser.

## Status
This project is currently in active development. Basic CRUD operations and UI modules are established, while real-time API integrations are ongoing.
