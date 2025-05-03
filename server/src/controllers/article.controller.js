import Article from "../models/Article.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create a new article
export const createArticle = asyncHandler(async (req, res, next) => {
  const { title, category, content, slug, isPublished } = req.body;
  const author = req.user?._id || req.user; // assuming req.user is set by auth middleware

  if (!title || !category || !content || !slug) {
    throw new ApiError(400, "All fields are required");
  }

  const exists = await Article.findOne({ slug });
  if (exists) {
    throw new ApiError(409, "Article with this slug already exists");
  }

  const article = await Article.create({
    title,
    category,
    content,
    author,
    slug,
    isPublished,
  });

  res.status(201).json(new ApiResponse(201, "Article created", article));
});

// Update an article
export const updateArticle = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, category, content, slug, isPublished } = req.body;
  const userId = req.user?._id || req.user;

  const article = await Article.findById(id);
  if (!article) {
    throw new ApiError(404, "Article not found");
  }

  if (article.author.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to update this article");
  }

  if (slug && slug !== article.slug) {
    const exists = await Article.findOne({ slug });
    if (exists) {
      throw new ApiError(409, "Article with this slug already exists");
    }
    article.slug = slug;
  }

  if (title) article.title = title;
  if (category) article.category = category;
  if (content) article.content = content;
  if (typeof isPublished === "boolean") article.isPublished = isPublished;

  await article.save();

  res.json(new ApiResponse(200, "Article updated", article));
});

// Delete an article
export const deleteArticle = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user?._id || req.user;

  const article = await Article.findById(id);
  if (!article) {
    throw new ApiError(404, "Article not found");
  }

  if (article.author.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to delete this article");
  }

  await article.deleteOne();

  res.json(new ApiResponse(200, "Article deleted"));
});

// Get articles by current user
export const getMyArticles = asyncHandler(async (req, res, next) => {
  const userId = req.user?._id || req.user;

  const articles = await Article.find({ author: userId }).populate("category");

  res.json(new ApiResponse(200, "My articles", articles));
});
