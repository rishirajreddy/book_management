import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";

import {
  jwt_access_token_secret,
  jwt_refresh_token_secret,
} from "../../config/env.js";
export function generateAccessToken(user) {
  const token = JWT.sign(
    { id: user.id, email: user.email },
    jwt_access_token_secret,
    {
      expiresIn: "3d",
    }
  );

  return token;
}

export async function generateRefreshToken(user) {
  const token = JWT.sign(
    { id: user.id, email: user.email },
    jwt_refresh_token_secret,
    {
      expiresIn: "7d",
    }
  );

  //hash token
  const hashedToken = await bcrypt.hash(token, 10);
  const token_expiration = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  return {
    refresh_token: token,
    hashedRefreshToken: hashedToken,
    token_expiration,
  };
}

export function getPagination(pagination) {
  if (pagination == undefined) {
    return { limit: 25, offset: null };
  } else {
    const limit = +pagination.size;
    const offset =
      pagination.page <= 1 ? 0 * limit : (pagination.page - 1) * limit;
    return { limit, offset };
  }
}

export function generatePaginationMeta({ pagination, data_length }) {
  const meta = {
    pagination: {
      page: pagination ? parseInt(pagination.page) : 1,
      pageSize: pagination ? parseInt(pagination.size) : data_length,
      pageCount: pagination ? Math.ceil(data_length / pagination.size) : 1,
      total: data_length,
    },
  };
  return meta;
}
