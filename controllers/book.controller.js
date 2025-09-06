const asyncHandler = require('../middlewares/async');
const ErrorHandler = require('../middlewares/error');
const Book = require('../models/book.model');
const { validationResult } = require('express-validator');
const streamifier = require("streamifier");
const cloudinary = require('../config/cloudinary'); 


// @desc get all books
// @route GET /api/book
// @access Public
exports.getAllBooks = asyncHandler(async (req, res, next) => {
    const books = await Book.find()
        .populate('category', 'title')
        .populate('language', 'title')
        .populate('author', 'title');

    res.status(200).json({ 
        success: true, 
        count: books.length,
        data: books 
    });
});

// Helper: PDFni Cloudinaryga yuklash
const uploadPdfToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "raw", folder: "books" },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// @desc create a new book
// @route POST /api/book
// @access Private
exports.createBook = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorHandler(errors.array().map(err => err.msg).join(", "), 400));
  }

  console.log("✅ Fayl keldi:", req.file.originalname, req.file.mimetype, req.file.size);

  if (!req.file) {
    return next(new ErrorHandler("PDF fayl topilmadi!", 400));
  }

  let pdfUrl;
  try {
    pdfUrl = await uploadPdfToCloudinary(req.file.buffer);
  } catch (err) {
    return next(new ErrorHandler("PDF yuklashda xatolik: " + err.message, 500));
  }

  const { title, description, year, rating, category, language, author } = req.body;

  const newBook = new Book({
    title,
    description,
    year,
    rating,
    category,
    language,
    author,
    pdf: pdfUrl,
  });

  await newBook.save();

  res.status(201).json({
    success: true,
    data: newBook,
  });
});

// @desc update a book
// @route PUT /api/book/:id
// @access Private
exports.updateBook = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ErrorHandler(
            errors.array().map(err => err.msg).join(', '), 
            400
        ));
    }

    const book = await Book.findById(req.params.id);
    if (!book) {
        return next(new ErrorHandler('Kitob topilmadi', 404));
    }

    const updates = { ...req.body };
    delete updates.pdf;

    Object.keys(updates).forEach(key => {
        book[key] = updates[key];
    });

    await book.save();

    res.status(200).json({
        success: true,
        data: book
    });
});

// @desc delete a book
// @route DELETE /api/book/:id
// @access Private
exports.deleteBook = asyncHandler(async (req, res, next) => {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
        return next(new ErrorHandler('Kitob topilmadi', 404));
    }

    res.status(200).json({ 
        success: true, 
        message: 'Kitob muvaffaqiyatli o‘chirildi' 
    });
});