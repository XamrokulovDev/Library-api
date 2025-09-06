const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Language', languageSchema);