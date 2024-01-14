import mongoose from "mongoose";
require('dotenv').config();

const connectDb = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error:any) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
