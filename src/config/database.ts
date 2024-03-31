import mongoose from "mongoose";

export const connectDb = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set in the environment variables");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connection with MongoDB established");
  } catch (error) {
    console.error(error);
  }
};
