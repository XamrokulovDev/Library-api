const { body } = require('express-validator');

const createAuthorValidator = [
  body('title')
    .notEmpty().withMessage('Yozuvchi nomi bo‘sh bo‘lishi mumkin emas!')
    .isString().withMessage('Yozuvchi nomi string bo‘lishi kerak!')
    .isLength({ min: 2, max: 50 }).withMessage('Yozuvchi nomi uzunligi 2–50 oraliqda bo‘lishi kerak!')
    .trim(),
];

const updateAuthorValidator = [
  body('title')
    .optional() // yangilashda majburiy emas
    .isString().withMessage('Yozuvchi nomi string bo‘lishi kerak!')
    .isLength({ min: 2, max: 50 }).withMessage('Yozuvchi nomi uzunligi 2–50 oraliqda bo‘lishi kerak!')
    .trim(),
];

module.exports = {
  createAuthorValidator,
  updateAuthorValidator,
};