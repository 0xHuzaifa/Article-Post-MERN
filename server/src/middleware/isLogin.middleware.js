import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const isLogin = asyncHandler((req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new ApiError(401, "Unauthorized, please login first");
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_ACCESS_TOKEN_SECRET_KEY
      );
      req.user = decoded;
    } catch (error) {
      throw new ApiError(401, "Invalid token");
    }
  } catch (error) {
    next(error);
  }
});

export default isLogin;
