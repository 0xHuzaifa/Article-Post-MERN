import Category from "../models/Category.model.js";
import Article from "../models/Article.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create a new category
const createCategory = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;
  const author = req.user?.id;

  if (!name || !description) {
    throw new ApiError(400, "Name and description are required");
  }

  if (await Category.findOne({ name })) {
    throw new ApiError(409, "Category with this name already exists");
  }

  const category = await Category.create({
    name,
    description,
    author,
  });

  res.status(201).json(new ApiResponse(201, "Category created", category));
});

// Update a category
const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const userId = req.user?.id;

  const category = await Category.findById(id);
  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  if (category.author.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to update this category");
  }

  // if (name) category.name = name;
  // if (description) category.description = description;
  // await category.save();
  const updateCategory = await findByIdAndUpdate(
    { _id: id },
    {
      name: name,
      description: description,
    },
    { new: true }
  );

  res.json(new ApiResponse(200, "Category updated", updateCategory));
});

// Delete a category
const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user?.id;

  const category = await Category.findById(id);
  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  if (category.author.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to delete this category");
  }

  const unCategorized = await getUnCategorized(req);
  await Article.updateMany(
    { category: category._id },
    { category: unCategorized._id }
  );

  await Category.findByIdAndDelete(category._id);

  res.json(new ApiResponse(200, "Category deleted"));
});

// Get unCategorized
const getUnCategorized = async (req) => {
  let unCategorized = await Category.findOne({ name: "Un-Categorized" });
  if (!unCategorized) {
    unCategorized = new Category({
      name: "Un-Categorized",
      description: "no category",
      author: req.user.id,
    });
    await unCategorized.save();
  }
  return unCategorized;
};

// Get a specific category by slug
const getSpecificCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findOne({ _id: id }).populate(
    "author",
    "username email"
  );
  if (!category) {
    throw new ApiError(404, "Category not found");
  }
  res.json(new ApiResponse(200, "Category found", category));
});

// Get all categories
const getAllCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();
  res.json(new ApiResponse(200, "Categories retrieved", categories));
});

export {
  createCategory,
  updateCategory,
  deleteCategory,
  getSpecificCategory,
  getAllCategories,
};
