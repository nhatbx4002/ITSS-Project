# ITSS Project - Gym Management System

A full-stack web application for managing a gym using Next.js for frontend and Node.js with MongoDB for backend.

## Project Structure

```
.
├── backend/           # Node.js backend
│   ├── controllers/  # API controllers
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   └── server.js     # Server entry point
├── frontend/         # Next.js frontend
│   ├── src/
│   │   ├── app/     # Next.js app router
│   │   ├── components/ # Reusable components
│   │   └── lib/     # Utility functions
│   └── public/      # Static assets
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn
- Git

## Setup Instructions

### Clone Project

1. Clone the repository:
   ```git
   git clone [your-repository-url]
   cd [project-directory]
   ```

### Backend Setup

1. Navigate to the backend directory:
   cd backend

2. Install dependencies:
   npm install

3. Create a .env file in the backend directory with the following variables:
   PORT=5000
   MONGODB_URI=
   JWT_SECRET=

4. Start the backend server:
   npm run dev

### Frontend Setup

1. Navigate to the frontend directory:
   cd frontend

2. Install dependencies:
   npm install

3. Install required shadcn components:
   npm install @types/node --save-dev

4. Start the development server:
   npm run dev

## How to Run the Project

### Step 1: Start MongoDB
1. Make sure MongoDB is installed on your system
2. Start MongoDB service:
   - Windows: Open Services and start MongoDB service
   - Linux/Mac: Run `sudo service mongod start`

### Step 2: Start Backend Server
1. Open a new terminal
2. Navigate to backend directory:
   cd backend
3. Install dependencies (if not already installed):
   npm install
4. Start the server:
   npm run dev
5. The backend server will run on http://localhost:5000

### Step 3: Start Frontend Development Server
1. Open another terminal
2. Navigate to frontend directory:
   cd frontend
3. Install dependencies (if not already installed):
   npm install
4. Start the development server:
   npm run dev
5. The frontend will be available at http://localhost:3000

### Step 4: Access the Application
1. Open your web browser
2. Navigate to http://localhost:3000
3. You should see the application running

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Frontend
- Next.js 14
- React
- shadcn/ui components
- Tailwind CSS
- TypeScript/JavaScript

## Available Routes

### Frontend
- Home: http://localhost:3000

### Backend API
- Products API: http://localhost:5000/api/products

## Features

### Frontend
- Modern UI with shadcn components
- Responsive design
- Product listing and management
- Error handling and loading states

### Backend
- RESTful API
- MongoDB database integration
- Authentication and authorization
- Error handling and validation

## Troubleshooting

If you encounter any issues:

1. Check if all dependencies are installed correctly
2. Ensure MongoDB is running
3. Verify environment variables are set correctly
4. Check the browser console for frontend errors
5. Check the terminal for backend errors

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License.
