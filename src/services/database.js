import mongoose from "mongoose";
import { mongodbUri } from "../../config/dbConfig.js";

export const connectDB = () => {
  mongoose.connect(mongodbUri);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
};
