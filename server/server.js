const express = require('express');
const book = require('./book.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Note that it is common practice got backend APIs in Node to start with the api prefix
// to distinguish them from frontend routes
app.use('/api/book', book);

app.listen(3001, function() {
    console.log('Starting server');
});