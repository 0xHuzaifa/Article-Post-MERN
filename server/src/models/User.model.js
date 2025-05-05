import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      min: 3,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    refreshToken: String,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessTokens = function () {
  const accessToken = jwt.sign(
    { id: this._id, role: this.role, name: this.username },
    process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY }
  );

  return accessToken;
};

UserSchema.methods.generateRefreshTokens = function () {
  const refreshToken = jwt.sign(
    { id: this._id, role: this.role, name: this.username },
    process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY }
  );

  return refreshToken;
};

const User = mongoose.model("User", UserSchema);
export default User;
