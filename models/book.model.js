const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true,
        enum: ['1', '2', '3', '4', '5'  ]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    pdf: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Book', bookSchema);