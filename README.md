# Shoe Store Web Application

A modern e-commerce website for selling shoes, inspired by Nike's design.

## Tech Stack

### Frontend
- ReactJS
- JavaScript
- Tailwind CSS
- Redux Toolkit (State Management)
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer (File Upload)

## Features

- User Authentication (Register, Login, Logout)
- Product Catalog with Filtering and Search
- Shopping Cart
- Wishlist
- Order Management
- Admin Dashboard
- Responsive Design
- Product Reviews and Ratings
- Size Guide
- Payment Integration

## Project Structure

```
shoestoreweb/
├── client/                 # Frontend React application
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── redux/
│       ├── services/
│       └── utils/
│
└── server/                 # Backend Node.js application
    ├── config/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    └── utils/
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Create .env file in server directory with following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend server
   cd ../client
   npm start
   ```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 