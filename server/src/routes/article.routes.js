import {
  createArticle,
  updateArticle,
  deleteArticle,
  getMyArticles,
  getSpecificArticle,
  getPublishedArticles,
  getUnpublishedArticles,
} from "../controllers/article.controller.js";
import isLogin from "../middleware/isLogin.middleware.js";

import express from "express";

const route = express.Router();

// Public routes
// These routes are accessible without authentication
route.get("/articles", getPublishedArticles);
route.get("/unpublished-articles", getUnpublishedArticles);
route.post("/specific-article/:slug", getSpecificArticle);

route.use(isLogin); // Protect the following routes
route.post("/create-article", createArticle);
route.post("/update-article/:id", updateArticle);
route.post("/delete-article/:id", deleteArticle);
route.post("/my-articles", getMyArticles);

export default route;
