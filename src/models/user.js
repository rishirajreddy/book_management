import mongoose from "mongoose";

export const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    country_code: {
      type: String,
    },
    password: {
      type: String,
      select: false,
    },
    refresh_token: {
      type: String,
    },
    refresh_token_expiry: {
      type: Date,
    },
  })
);
