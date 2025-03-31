// IMPORTS
import mongoose from 'mongoose';

// CONNECT TO MONGODB
const connectDb = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// EXPORTS
export default connectDb;
