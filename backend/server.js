const path = require('path');
const express = require('express');
const cloudinary = require('cloudinary');

// FIXED PATHS (IMPORTANT)
const app = require('./app');
const connectDatabase = require('./config/database');

// Load environment variables
require('dotenv').config({
  path: path.join(__dirname, 'config/.config.env')
});

const PORT = process.env.PORT || 4000;

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Uncaught Exception Error: ${err.message}`);
  process.exit(1);
});

// Connect to MongoDB
connectDatabase();

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Deployment setup
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  // Serve frontend from root/frontend/build
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
  });
}

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Unhandled Promise Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
