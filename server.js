const express = require('express');
const app = express();

require('dotenv').config();

const cors = require('cors');
const bodyParser = require('body-parser');
const connectDb = require('./config/mongoose');

const PORT = process.env.PORT;

// Connect to MongoDB
connectDb();

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

// Project routes
app.use('/api/author', require('./routes/author.route'));
app.use('/api/language', require('./routes/language.route'));
app.use('/api/category', require('./routes/category.route'));
app.use('/api/book', require('./routes/book.route'));

// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to the Library API');
});

// Start the server
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running on ${PORT}`);
})