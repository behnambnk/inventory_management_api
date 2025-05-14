const asyncHandler = require("express-async-handler");
const Category = require("../models/category");

// GET all categories
exports.getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

// GET one category by ID
exports.getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  res.status(200).json(category);
});

// POST create category
exports.createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const category = new Category({ name, description });
  await category.save();
  res.status(201).json(category);
});

// PUT update category
exports.updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  res.status(200).json(category);
});

// DELETE category
exports.deleteCategory = asyncHandler(async (req, res) => {
  const result = await Category.findByIdAndDelete(req.params.id);
  if (!result) {
    res.status(404);
    throw new Error("Category not found");
  }
  res.status(204).send();
});