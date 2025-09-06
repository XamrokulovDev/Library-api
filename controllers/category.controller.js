const asyncHandler = require("../middlewares/async");
const ErrorHandler = require("../middlewares/error");
const Category = require("../models/category.model");
const { validationResult } = require("express-validator");

// @desc get all categories
// @route GET /api/category
// @access Public
exports.getAllCategory = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();

  if (!categories) {
    return next(new ErrorHandler("Hozircha kategoriyalar topilmadi!", 404));
  }

  res.status(200).json({
    success: true,
    data: categories,
  });
});

// @desc get all category
// @route GET /api/category
// @access Public
exports.getAllCategory = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();

  if (!categories) {
    return next(new ErrorHandler("Hozircha kategoriyalar topilmadi!", 404));
  }

  res.status(200).json({
    success: true,
    data: categories,
  });
});

// @desc create category
// @route POST /api/category
// @access Private
exports.createCategory = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new ErrorHandler(
        errors
          .array()
          .map((err) => err.msg)
          .join(", "),
        400
      )
    );
  }

  const { title } = req.body;

  const category = await Category.create({ title });

  res.status(201).json({
    success: true,
    data: category,
  });
});

// @desc update category
// @route PUT /api/category/:id
// @access Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new ErrorHandler(
        errors
          .array()
          .map((err) => err.msg)
          .join(", "),
        400
      )
    );
  }

  const { id } = req.params;
  const { title } = req.body;

  let category = await Category.findById(id);

  if (!category) {
    return next(new ErrorHandler("Bunday kategoriya topilmadi!", 404));
  }

  category.title = title || category.title;
  await category.save();

  res.status(200).json({
    success: true,
    data: category,
  });
});

// @desc delete category
// @route DELETE /api/category/:id
// @access Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return next(new ErrorHandler("Bunday kategoriya topilmadi!", 404));
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});