import mongoose from "mongoose";

export const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publication_year: {
      type: Number,
    },
    publisher: {
      type: String,
    },
    genre: {
      type: String,
    },
  })
);
