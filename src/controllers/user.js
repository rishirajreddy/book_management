import { salt_rounds } from "../../config/env.js";
import { User } from "../models/user.js";
import { errorResponse } from "../services/errorHandler.js";
import bcrypt from "bcryptjs";
import updateUserTokens from "../utils/updateUserTokens.js";
import {
  generateAccessToken,
  generateRefreshToken,
  getPagination,
} from "../utils/helpers.js";

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
    const { limit, offset } = getPagination(pagination);
    const users = await User.find()
      .limit(limit)
      .skip(offset)
      .select("-password");
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

    const user = await User.findById(id).select("-password");
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
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(204).send(
        errorResponse({
          status: 204,
          message: "No User found with the given mail",
        })
      );
    }

    //compare password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).send(
        errorResponse({
          status: 400,
          message: "Invalid email or password",
        })
      );
    }

    //generate access_token and refresh_token
    const access_token = generateAccessToken(user);
    const { hashedRefreshToken } = await generateRefreshToken(user);
    const plainUser = user.toObject();
    delete plainUser["password"];
    return res.status(200).send({
      access_token,
      refresh_token: hashedRefreshToken,
      user: plainUser,
    });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: err.message }));
  }
};
