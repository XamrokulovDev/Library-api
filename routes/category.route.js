const { Router } = require('express');
const router = Router();

const {
    getAllCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category.controller');

const {
    createCategoryValidator,
    updateCategoryValidator
} = require('../validators/category.validate');

// Routes
router.get('/', getAllCategory);
router.post('/', createCategoryValidator, createCategory);
router.put('/:id', updateCategoryValidator, updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;