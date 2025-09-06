const asyncHandler = require("../middlewares/async");
const ErrorHandler = require("../middlewares/error");
const Author = require("../models/author.model");
const { validationResult } = require("express-validator");

// @desc get all author
// @route GET /api/author
// @access Public
exports.getAllAuthors = asyncHandler(async (req, res, next) => {
  const authors = await Author.find();
  if (!authors) {
    return next(new ErrorHandler("Hozircha yozuvchilar topilmadi!", 404));
  }
  res.status(200).json({
    success: true,
    data: authors,
  });
});

// @desc create author
// @route POST /api/author
// @access Private
exports.createAuthor = asyncHandler(async (req, res, next) => {
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

  const author = await Author.create({ title });
  res.status(201).json({
    success: true,
    data: author,
  });
});

// @desc update author
// @route PUT /api/author/:id
// @access Private
exports.updateAuthor = asyncHandler(async (req, res, next) => {
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

  let author = await Author.findById(id);

  if (!author) {
    return next(new ErrorHandler("Bunday yozuvchi topilmadi!", 404));
  }

  author.title = title || author.title;
  await author.save();

  res.status(200).json({
    success: true,
    data: author,
  });
});

// @desc delete author
// @route DELETE /api/author/:id
// @access Private
exports.deleteAuthor = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const author = await Author.findByIdAndDelete(id);

  if (!author) {
    return next(new ErrorHandler("Bunday yozuvchi topilmadi!", 404));
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
