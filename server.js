const path = require('path');
const express = require('express');
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');

// ✅ Load env FIRST
dotenv.config({
  path: path.join(__dirname, 'backend/config/.config.env'),
});

// ✅ Import AFTER dotenv
const app = require('./backend/app');
const connectDatabase = require('./backend/config/database');

const PORT = process.env.PORT || 4000;

// ✅ Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

// ✅ Connect MongoDB
connectDatabase();

// ✅ Cloudinary Config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Deployment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
  });
}

// ✅ Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// ✅ Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
