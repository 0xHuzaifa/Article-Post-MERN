import {
  createCategory,
  updateCategory,
  deleteCategory,
  getSpecificCategory,
  getAllCategories,
} from "../controllers/category.controller.js";
import isLogin from "../middleware/isLogin.middleware.js";
import isAdmin from "../middleware/isAdmin.middleware.js";
import express from "express";

const router = express.Router();

router.use(isLogin); // middleware

router.get("/get-categories", getAllCategories);

router.use(isAdmin); // middleware

router.post("/create-category", createCategory);
router.put("/update-category", updateCategory);
router.delete("/delete-category/:id", deleteCategory);
router.get("/specific-category/:id", getSpecificCategory);

export default router;
