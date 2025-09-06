const { body } = require('express-validator');

const createLanguageValidator = [
  body('title')
    .notEmpty().withMessage('Til nomi bo‘sh bo‘lishi mumkin emas!')
    .isString().withMessage('Til nomi string bo‘lishi kerak!')
    .isLength({ min: 2, max: 50 }).withMessage('Til nomi uzunligi 2–50 oraliqda bo‘lishi kerak!')
    .trim(),
];

const updateLanguageValidator = [
  body('title')
    .optional() // yangilashda majburiy emas
    .isString().withMessage('Til nomi string bo‘lishi kerak!')
    .isLength({ min: 2, max: 50 }).withMessage('Til nomi uzunligi 2–50 oraliqda bo‘lishi kerak!')
    .trim(),
];

module.exports = {
  createLanguageValidator,
  updateLanguageValidator,
};