import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const isAdmin = asyncHandler((req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "admin") {
      next();
    } else {
      throw new ApiError(401, "Unauthorized: please login as an admin");
    }
  } catch (error) {
    next(error);
  }
});

export default isAdmin;
