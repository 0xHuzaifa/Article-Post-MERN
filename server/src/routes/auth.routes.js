import { register, login, logout } from "../controllers/auth.controller.js";
import isLogin from "../middleware/isLogin.middleware.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isLogin, logout);

export default router;
