// /backend/server.js

const express = require('express'); // Express framework for building web applications
const mongoose = require('mongoose'); // Interact with MongoDB
const cors = require('cors'); // Allow cross-origin requests
const bodyParser = require('body-parser'); // Parse incoming request bodies in middleware
const authRoutes = require('./routes/auth'); // Authentication routes from the routes directory

require('dotenv').config(); // Load environment variables from a .env file into process.env

const app = express();
const PORT = process.env.PORT || 5000; // Define Port #

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected')) // Log success message if connection is successful
  .catch(err => console.log(err)); // Log error message if connection fails

app.use(cors()); // Use cors middleware to enable cross-origin requests
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON requests
app.use('/api/auth', authRoutes); // Use the imported authentication routes for all requests to /api/auth

// Ping route for health check purposes
app.get('/ping', (req, res) => {
  res.send('pong'); // Respond with 'pong' to indicate server is running
});

// Remove app.listen here

module.exports = app; // Export the app for use in other modules, such as testing
