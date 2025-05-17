import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb+srv://yousafshahyusaf:myousaf123@cluster0.pkake.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
      // options can be added here if needed, depending on Mongoose version
      dbName: 'yourDatabaseName', // optional if included in URI
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
