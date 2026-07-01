# Movie Reviews API

A REST API to manage movie reviews built with Node.js, Express.js and MongoDB following MVC architecture.

## Features
- Full CRUD for reviews
- Filter reviews by genre
- Sort reviews by rating
- Search reviews by movie title

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

## How to Run
- npm install
- npm run dev

## API Endpoints
- POST   /reviews                 - Create a review
- GET    /reviews                 - Get all reviews
- GET    /reviews/:id             - Get a review by ID
- PUT    /reviews/:id             - Update a review
- DELETE /reviews/:id             - Delete a review
- GET    /reviews?title=          - Search by title
- GET    /reviews/filter/:genre   - Filter by genre
- GET    /reviews/sorted/rating   - Sort by rating