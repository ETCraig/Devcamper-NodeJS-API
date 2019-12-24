const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

const connectDB = require('./config/db');

connectDB();

dotenv.config({ path: './config/config.env' });

const bootcamps = require('./routes/bootcamps');

const app = express();

app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 8000;

const server = app.listen(
    PORT,
    console.log(`Server Is Running In ${process.env.NODE_ENV} And Listening On Port: ${PORT}`.yellow.bold)
);

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    server.close(() => process.exit91);
});