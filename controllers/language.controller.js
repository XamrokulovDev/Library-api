const asyncHandler = require("../middlewares/async");
const ErrorHandler = require("../middlewares/error");
const Language = require("../models/language.model");
const { validationResult } = require("express-validator");

// @desc get all languages
// @route GET /api/language
// @access Public
exports.getAllLanguage = asyncHandler(async (req, res, next) => {
  const languages = await Language.find();

  if (!languages) {
    return next(new ErrorHandler("Hozircha tillar topilmadi!", 404));
  }

  res.status(200).json({
    success: true,
    data: languages,
  });
});

// @desc create language
// @route POST /api/language
// @access Private
exports.createLanguage = asyncHandler(async (req, res, next) => {
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

  const language = await Language.create({ title });

  res.status(201).json({
    success: true,
    data: language,
  });
});

// @desc update language
// @route PUT /api/language/:id
// @access Private
exports.updateLanguage = asyncHandler(async (req, res, next) => {
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

  let language = await Language.findById(id);

  if (!language) {
    return next(new ErrorHandler("Bunday til topilmadi!", 404));
  }

  language.title = title || language.title;
  await language.save();

  res.status(200).json({
    success: true,
    data: language,
  });
});

// @desc delete language
// @route DELETE /api/language/:id
// @access Private
exports.deleteLanguage = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const language = await Language.findByIdAndDelete(id);

  if (!language) {
    return next(new ErrorHandler("Bunday til topilmadi!", 404));
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});