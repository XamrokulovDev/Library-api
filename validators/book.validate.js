// validators/book.validate.js
const { body } = require('express-validator');

const baseFields = [
  body('title')
    .notEmpty().withMessage('Kitob nomi bo‘sh bo‘lishi mumkin emas!')
    .isString().withMessage('Kitob nomi string bo‘lishi kerak!')
    .isLength({ min: 2, max: 100 }).withMessage('Kitob nomi uzunligi 2–100 oraliqda bo‘lishi kerak!')
    .trim(),

  body('description')
    .notEmpty().withMessage('Tavsif bo‘sh bo‘lishi mumkin emas!')
    .isString().withMessage('Tavsif string bo‘lishi kerak!')
    .isLength({ min: 10, max: 1000 }).withMessage('Tavsif uzunligi 10–1000 oraliqda bo‘lishi kerak!')
    .trim(),

  body('year')
    .notEmpty().withMessage('Nashr yili bo‘sh bo‘lishi mumkin emas!')
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage(`Nashr yili 1000 dan ${new Date().getFullYear()} gacha bo‘lishi kerak!`)
    .toInt(),

  body('rating')
    .notEmpty().withMessage('Reyting bo‘sh bo‘lishi mumkin emas!')
    .isIn(['1','2','3','4','5']).withMessage('Reyting 1 dan 5 gacha bo‘lishi kerak!')
    .trim(),

  body('category')
    .notEmpty().withMessage('Kategoriya ID bo‘sh bo‘lishi mumkin emas!')
    .isMongoId().withMessage('Kategoriya ID noto‘g‘ri formatda!')
    .trim(),

  body('language')
    .notEmpty().withMessage('Til ID bo‘sh bo‘lishi mumkin emas!')
    .isMongoId().withMessage('Til ID noto‘g‘ri formatda!')
    .trim(),

  body('author')
    .notEmpty().withMessage('Yozuvchi ID bo‘sh bo‘lishi mumkin emas!')
    .isMongoId().withMessage('Yozuvchi ID noto‘g‘ri formatda!')
    .trim(),
];

// CREATE: PDF fayl majburiy
const createBookValidator = [
  ...baseFields,
  body().custom((_, { req }) => {
    if (!req.file) {
      throw new Error('PDF fayl majburiy');
    }
    if (req.file.mimetype !== 'application/pdf') {
      throw new Error('Faqat PDF qabul qilinadi');
    }
    const MAX = 100 * 1024 * 1024;
    if (req.file.size > MAX) {
      throw new Error('PDF hajmi 100MB dan oshmasin');
    }
    return true;
  }),
];

// UPDATE: PDF majburiy emas (alohida endpoint bo‘lsa yaxshi)
const updateBookValidator = [
  body('title').optional().isString().isLength({ min: 2, max: 100 }).trim(),
  body('description').optional().isString().isLength({ min: 10, max: 1000 }).trim(),
  body('year').optional().isInt({ min: 1000, max: new Date().getFullYear() }).toInt(),
  body('rating').optional().isIn(['1','2','3','4','5']).trim(),
  body('category').optional().isMongoId().trim(),
  body('language').optional().isMongoId().trim(),
  body('author').optional().isMongoId().trim(),
];

module.exports = { createBookValidator, updateBookValidator };