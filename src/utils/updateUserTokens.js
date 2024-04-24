import { generateAccessToken, generateRefreshToken } from "../utils/helpers.js";

export default async function updateUserTokens(user) {
  const access_token = generateAccessToken(user);
  const { refresh_token, hashedRefreshToken, token_expiration } =
    await generateRefreshToken(user);
  //store the refresh_token
  user["refresh_token"] = hashedRefreshToken;
  user["refresh_token_expiry"] = token_expiration;

  return { access_token, refresh_token, userData: user };
}
