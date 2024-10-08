# Notes API

## Overview

This project is a RESTful API for managing notes, built using Node.js, Express, and MongoDB. The API supports Google OAuth for user authentication and provides endpoints to create, read, update, and delete notes associated with an authenticated user. The API also supports JWT-based authorization.

## Features

- **Google OAuth Authentication**: Users can log in using their Google accounts.
- **JWT Authorization**: Access to the API endpoints is secured using JSON Web Tokens (JWT).
- **CRUD Operations**: Create, read, update, and delete notes.
- **User-specific Data**: Each user's notes are private and can only be accessed by them.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing notes.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **Passport.js**: Authentication middleware for Node.js.
- **JWT**: JSON Web Tokens for securing API endpoints.
- **Swagger**: API documentation and testing.

## Prerequisites

- **Node.js**: Install Node.js from [here](https://nodejs.org/).
- **MongoDB**: Install MongoDB from [here](https://www.mongodb.com/).

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/chruy-chruy/note-taking.git
   cd notes-api


2. **Install Dependencies:**
    ```bash
    npm install

3. **Environment Variables:**

    Create a .env file in the root directory and configure the following variables:
    ```bash
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    SESSION_SECRET=your_session_secret
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    JWT_SECRET=your_jwt_secret


4. **Run the Application:**
    ```bash
    npm run dev

**The server should start on http://localhost:5000.**

## API Endpoints
1. **Google OAuth:**
- Login: GET /api/auth/google
- Callback: GET /api/auth/google/callback

2. **Notes**
- Create Note: POST /api/notes
- Get All Notes: GET /api/notes
- Get Note by ID: GET /api/notes/:noteId
- Update Note by ID: PUT /api/notes/:noteId
- Delete Note by ID: DELETE /api/notes/:noteId

## Authorization
**All note-related endpoints require a valid JWT token in the Authorization header:**

Authorization: Bearer your_jwt_token

## API Documentation
**The API documentation is available via Swagger. Once the server is running, visit:**

http://localhost:5000/api-docs