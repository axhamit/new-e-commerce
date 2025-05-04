const path = require('path');
const express = require('express');
const cloudinary = require('cloudinary');
const app = require('./backend/app');
const connectDatabase = require('./backend/config/database');

// ✅ Load .env variables at the very top and from correct path
require('dotenv').config({ path: 'backend/config/config.env' });

const PORT = process.env.PORT || 4000;

// ✅ Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Uncaught Exception Error: ${err.message}`);
  process.exit(1);
});

// ✅ Connect to MongoDB
connectDatabase();

// ✅ Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Deployment setup
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
  });
}

// ✅ Start Server
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// ✅ Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Unhandled Promise Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
