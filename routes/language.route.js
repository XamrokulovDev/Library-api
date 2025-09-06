const { Router } = require("express");
const router = Router();

const {
  getAllLanguage,
  createLanguage,
  updateLanguage,
  deleteLanguage,
} = require("../controllers/language.controller");

const {
  createLanguageValidator,
  updateLanguageValidator,
} = require("../validators/language.validate");

// Routes
router.get("/", getAllLanguage);
router.post("/", createLanguageValidator, createLanguage);
router.put("/:id", updateLanguageValidator, updateLanguage);
router.delete("/:id", deleteLanguage);

module.exports = router;