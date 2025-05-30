const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./config');

const routes = require('./routes');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // React app runs on port 3000
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined'));

// Debug middleware
app.use((req, res, next) => {
    console.log('\n=== New Request ===');
    console.log(`Time: ${new Date().toISOString()}`);
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('\n=== Error ===');
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

// Start server
app.listen(port, () => {
    console.log('\n=== Server Started ===');
    console.log(`Server is running on port ${port}`);
    console.log(`API endpoints are available at http://localhost:${port}/api`);
    console.log('Waiting for requests...\n');
}); 