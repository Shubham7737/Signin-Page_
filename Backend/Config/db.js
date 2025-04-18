const mongoose = require('mongoose');
require("dotenv").config()


// Connect to MongoDB
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
      });
      // console.log(`MongoDB Connected: ${conn.connection.host}`);
      console.log(`MongoDB Connected`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

module.exports = connectDB;
