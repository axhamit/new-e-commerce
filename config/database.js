const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose.set('strictQuery', false); // Optional: to suppress deprecation warning

  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('❌ MONGO_URI not defined in environment');
    process.exit(1);
  }

  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`✅ MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err);
      process.exit(1);
    });
};

module.exports = connectDatabase;
