import { Book } from "../models/book.js";
import { errorResponse } from "../services/errorHandler.js";
import { getPagination } from "../utils/helpers.js";

export const create = async (req, res) => {
  try {
    const { title, author, publication_year, publisher, genre } = req.body;

    const book = await Book.create({
      title,
      author,
      publication_year,
      publisher,
      genre,
    });

    await book.save();
    return res.status(200).send(book);
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: err.message }));
  }
};

export const find = async (req, res) => {
  try {
    const pagination = req.query.pagination;
    const { limit, offset } = getPagination(pagination);
    const query = req.filters;
    const books = await Book.find({
      $and: query,
    })
      .limit(limit)
      .skip(offset);

    return res.status(200).send(books);
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: err.message }));
  }
};

export const findOne = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(204).send(
        errorResponse({
          status: 204,
          message: "No book found with the given ID",
        })
      );
    }

    return res.status(200).send(book);
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: err.message }));
  }
};
export const update = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(204).send(
        errorResponse({
          status: 204,
          message: "No book found with the given ID",
        })
      );
    }

    const body = req.body;
    Object.assign(book, { ...body });

    await book.save();
    return res.status(201).send(book);
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: err.message }));
  }
};
export const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(204).send(
        errorResponse({
          status: 204,
          message: "No book found with the given ID",
        })
      );
    }
    await book.deleteOne();
    return res.status(200).send(book);
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: err.message }));
  }
};
