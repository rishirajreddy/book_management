import { salt_rounds } from "../../config/env.js";
import { User } from "../models/user.js";
import { errorResponse } from "../services/errorHandler.js";
import bcrypt from "bcryptjs";
import updateUserTokens from "../utils/updateUserTokens.js";
import { getPagination } from "../utils/helpers.js";

export const create = async (req, res) => {
  try {
    const { email, phone, country_code, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      email,
      phone,
      country_code,
      password: hashPassword,
    });

    await user.save();

    //generate access_token and refresh_token
    let { access_token, refresh_token, userData } = await updateUserTokens(
      user
    );

    await userData.save();

    return res
      .status(200)
      .send({ access_token, refresh_token, user: userData });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: err.message }));
  }
};

export const find = async (req, res) => {
  try {
    //include pagination
    const pagination = req.query.pagination;
    const { limit } = getPagination(pagination);
    const users = await User.find().limit(limit).skip(offset);
    return res.status(200).send(users);
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

    const user = await User.findById(id);
    if (!user) {
      return res.status(204).send(
        errorResponse({
          status: 204,
          message: "No Usee found with the given ID",
        })
      );
    }

    return res.status(200).send(user);
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
    const user = await User.findById(id);
    if (!user) {
      return res.status(204).send(
        errorResponse({
          status: 204,
          message: "No Usee found with the given ID",
        })
      );
    }

    const body = req.body;
    Object.assign(user, { ...body });

    await user.save();
    return res.status(201).send(user);
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
    const user = await User.findById(id);
    if (!user) {
      return res.status(204).send(
        errorResponse({
          status: 204,
          message: "No Usee found with the given ID",
        })
      );
    }

    await user.deleteOne();
    return res.status(200).send(user);
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: err.message }));
  }
};

export const login = async (req, res) => {
  try {
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: err.message }));
  }
};
