const { Router } = require('express');
const router = Router();

const {
    getAllAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor
} = require('../controllers/author.controller');

const {
    createAuthorValidator,
    updateAuthorValidator
} = require('../validators/author.validate');

// Routes
router.get('/', getAllAuthors);
router.post('/', createAuthorValidator, createAuthor);
router.put('/:id', updateAuthorValidator, updateAuthor);
router.delete('/:id', deleteAuthor);

module.exports = router;