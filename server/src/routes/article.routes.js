import {
  createArticle,
  updateArticle,
  deleteArticle,
  getMyArticles,
  getSpecificArticle,
  getPublishedArticles,
  getUnpublishedArticles,
  getAllArticles,
} from "../controllers/article.controller.js";
import isLogin from "../middleware/isLogin.middleware.js";

import express from "express";

const route = express.Router();

// Public routes
// These routes are accessible without authentication
route.get("/published-articles", getPublishedArticles);
route.get("/specific-article/:slug", getSpecificArticle);
route.get("/all-articles", getAllArticles);

route.use(isLogin); // Protect the following routes
route.post("/create-article", createArticle);
route.put("/update-article/:id", updateArticle);
route.delete("/delete-article/:id", deleteArticle);
route.get("/my-articles", getMyArticles);
route.get("/unpublished-articles", getUnpublishedArticles);

export default route;
