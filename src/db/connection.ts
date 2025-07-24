import mongoose, { Mongoose } from "mongoose";


async function connectdb(): Promise<void> {
  try {
    const connectionInstance: Mongoose = await mongoose.connect(
      process.env.MONGODB_URI as string
    );
    console.log(
      `\nMongoDB connected !! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB connection FAILED\n", error);
    process.exit(1);
  }
}

export default connectdb;
