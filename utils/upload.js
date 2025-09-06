const multer = require('multer');
const path = require('path');

// Faqat pdf fayllarni qabul qilamiz
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.pdf') {
    return cb(new Error('Faqat PDF fayl qabul qilinadi!'), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;