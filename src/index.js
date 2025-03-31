// IMPORTING MODULES
import dotenv from 'dotenv';
import app from './app.js';
import connectDb from './db/index.js';

// CONFIGURE DOTENV TO LOAD ENVIRONMENT VARIABLES
dotenv.config({
  path: './.env',
});

// ESTABLISH A CONNECTION TO THE MONGODB DATABASE
connectDb()
  .then(function () {
    app.listen(PORT, function () {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch(function (error) {
    console.error('❌ MongoDB connection error', error);
    process.exit(1);
  });

// SET THE PORT FOR THE SERVER
const PORT = process.env.PORT || 8000;
