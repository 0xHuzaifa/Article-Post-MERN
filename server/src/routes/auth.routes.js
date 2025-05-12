import {
  register,
  login,
  logout,
  refreshAccessToken,
} from "../controllers/auth.controller.js";
import isLogin from "../middleware/isLogin.middleware.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isLogin, logout);
router.get("/refresh", refreshAccessToken);

export default router;
