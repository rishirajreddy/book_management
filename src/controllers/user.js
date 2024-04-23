import { salt_rounds } from "../../config/env.js";
import { User } from "../models/user.js";
import { errorResponse } from "../services/errorHandler.js";
import bcrypt from "bcryptjs";

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
    console.log(user);
    delete user.password;
    return res.status(200).send(user);
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: err.message }));
  }
};
