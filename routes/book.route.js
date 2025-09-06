const { Router } = require('express');
const router = Router();
const { createBookValidator, updateBookValidator } = require('../validators/book.validate');
const { createBook, getAllBooks, updateBook, deleteBook } = require('../controllers/book.controller');
const upload = require('../utils/upload');

// Get all books
router.get('/', getAllBooks);

// Create a new book
router.post('/', upload.single("pdf"), createBookValidator, createBook);

// Update a book by ID
router.put('/:id', updateBookValidator, updateBook);

// Delete a book by ID
router.delete('/:id', deleteBook);

module.exports = router;