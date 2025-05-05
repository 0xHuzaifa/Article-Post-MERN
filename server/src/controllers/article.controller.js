import Article from "../models/Article.model.js";
import Category from "../models/Category.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create a new article
const createArticle = asyncHandler(async (req, res) => {
  const { title, category, content, slug, isPublished } = req.body;
  const author = req.user?.id; // req.user is set by isLogin middleware

  if (!title || !category || !content || !isPublished) {
    throw new ApiError(400, "All fields are required");
  }

  const createSlug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  const articleExists = await Article.findOne({ slug: createSlug });
  if (articleExists) {
    throw new ApiError(409, "Article with this title already exists");
  }

  const categoryId = await Category.findOne({ name: category });
  if (!categoryId) {
    throw new ApiError(404, "Category not found");
  }

  const article = await Article.create({
    title,
    category: categoryId._id,
    content,
    author,
    slug: createSlug,
    isPublished,
  });

  res.status(201).json(new ApiResponse(201, "Article created", article));
});

// Update an article
const updateArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, category, content, isPublished } = req.body;
  const userId = req.user?.id;

  const article = await Article.findById(id);
  if (!article) {
    throw new ApiError(404, "Article not found");
  }

  if (article.author.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to update this article");
  }

  if (article.title !== title) {
    const newSlug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    if (newSlug !== article.slug) {
      const exists = await Article.findOne({ slug: newSlug });
      if (exists) {
        throw new ApiError(409, "Article with this Title already exists");
      }
      article.slug = newSlug;
    }
  }

  const categoryId = await Category.findOne({ name: category });
  if (!categoryId) {
    throw new ApiError(404, "Category not found");
  }

  if (title) article.title = title;
  if (category) article.category = categoryId._id;
  if (content) article.content = content;
  if (typeof isPublished === "boolean") article.isPublished = isPublished;

  await article.save();

  res.json(new ApiResponse(200, "Article updated", article));
});

// Delete an article
const deleteArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;

  const article = await Article.findById(id);
  if (!article) {
    throw new ApiError(404, "Article not found");
  }

  if (article.author.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to delete this article");
  }

  await Article.findByIdAndDelete(id);

  res.json(new ApiResponse(200, "Article deleted"));
});

// Get articles by current user
const getMyArticles = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  const articles = await Article.find({ author: userId })
    .populate("category, author")
    .sort({ createdAt: -1 });

  res.json(new ApiResponse(200, "My articles", articles));
});

const getSpecificArticle = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const article = await Article.findOne({ slug })
    .populate("category", "name _id")
    .populate("author", "username _id");
  if (!article) {
    throw new ApiError(404, "Article not found");
  }
  return res.status(200).json(new ApiResponse(200, "Article found", article));
});

// Get all published articles, public route
const getPublishedArticles = asyncHandler(async (req, res) => {
  const articles = await Article.aggregate([
    { $match: { isPublished: true } },
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $project: {
        title: 1,
        content: 1,
        slug: 1,
        isPublished: 1,
        category: { $arrayElemAt: ["$category.name", 0] },
        author: { $arrayElemAt: ["$author.username", 0] },
      },
    },
  ]);

  res.json(new ApiResponse(200, "Published articles", articles));
});

// Get all unpublished articles by current user
const getUnpublishedArticles = asyncHandler(async (req, res) => {
  const currentUser = req.user.id.toString();
  const articles = await Article.aggregate([
    { $match: { isPublished: false, author: currentUser } },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "authorDetails",
      },
    },
    {
      $project: {
        title: 1,
        content: 1,
        slug: 1,
        isPublished: 1,
        category: { $arrayElemAt: ["$categoryDetails.name", 0] },
        author: { $arrayElemAt: ["$authorDetails.name", 0] },
      },
    },
  ]);

  res.json(new ApiResponse(200, "Unpublished articles", articles));
});

export {
  createArticle,
  updateArticle,
  deleteArticle,
  getMyArticles,
  getSpecificArticle,
  getPublishedArticles,
  getUnpublishedArticles,
};
