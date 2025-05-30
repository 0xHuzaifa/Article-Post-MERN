import User from "../models/User.model.js";
import ApiError from "./ApiError.js";

const generateTokens = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(404, "user not found");
    }
    const accessToken = await user.generateAccessTokens();
    const refreshToken = await user.generateRefreshTokens();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "something went wrong while generating tokens");
  }
};

export default generateTokens;
