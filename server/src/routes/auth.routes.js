import {
  register,
  login,
  logout,
  refreshAccessToken,
  authMe,
} from "../controllers/auth.controller.js";
import isLogin from "../middleware/isLogin.middleware.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isLogin, logout);
router.get("/refresh", refreshAccessToken);
router.get("/auth-me", isLogin, authMe);

export default router;
