import User from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateTokens from "../utils/generateTokens.js";
import jwt from "jsonwebtoken";

// cookies option
const options = {
  httpOnly: true,
  secure: true,
  sameSite: "strict"
};

// Register
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ $or: [{ email }, { username }] });
  if (user) {
    throw new ApiError(409, "User already exists");
  }

  await User.create({ username, email, password });

  res.status(201).json(new ApiResponse(201, "User registered successfully"));
});

// Login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "Invalid Email");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(400, "Invalid Password");
  }

  const { accessToken, refreshToken } = await generateTokens(user._id);

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, {
      ...options,
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
    .json(
      new ApiResponse(200, "login successful", {
        id: user._id,
        email: user.email,
        user: user.username,
        role: user.role,
      })
    );
});

// Logout
const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user.id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "Logout successful"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    // Check if refreshToken exists in cookies or body with proper null handling
    const incomingRefreshToken = 
      req.cookies?.refreshToken || req.body?.refreshToken;

    // Handle missing token scenario
    if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized: No refresh token provided");
    }

    // Verify the token
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET_KEY
    );

    // Find user with error handling
    const user = await User.findById(decodedToken?.id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    // Validate token matches what's stored
    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    // Generate new access token
    const accessToken = await user.generateAccessTokens();

    // Return new token
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(200, "Access token refreshed"));
  } catch (error) {
    // Handle JWT verification errors specifically
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      throw new ApiError(401, "Invalid or expired token");
    }
    // Re-throw the error to be handled by asyncHandler and errorHandler
    throw error;
  }
});

const authMe = asyncHandler(async (req, res) => {
  const {id} = req.user;
  const user =  await User.findById(id);
  if (!user) {
    throw new ApiError(401, "User not found")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "authenticate successful", {id: user._id, username: user.username, email: user.email, role: user.role}));
});

export { register, login, logout, refreshAccessToken, authMe };
