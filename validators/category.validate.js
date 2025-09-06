const { body } = require('express-validator');

const createCategoryValidator = [
  body('title')
    .notEmpty().withMessage('Kategoriya nomi bo‘sh bo‘lishi mumkin emas!')
    .isString().withMessage('Kategoriya nomi string bo‘lishi kerak!')
    .isLength({ min: 2, max: 50 }).withMessage('Kategoriya nomi uzunligi 2–50 oraliqda bo‘lishi kerak!')
    .trim(),
];

const updateCategoryValidator = [
  body('title')
    .optional() // yangilashda majburiy emas
    .isString().withMessage('Kategoriya nomi string bo‘lishi kerak!')
    .isLength({ min: 2, max: 50 }).withMessage('Kategoriya nomi uzunligi 2–50 oraliqda bo‘lishi kerak!')
    .trim(),
];

module.exports = {
  createCategoryValidator,
  updateCategoryValidator,
};