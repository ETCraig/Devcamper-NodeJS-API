const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

connectDB();

dotenv.config({ path: './config/config.env' });

const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

const app = express();
app.use(express.json());

app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const server = app.listen(
    PORT,
    console.log(`Server Is Running In ${process.env.NODE_ENV} And Listening On Port: ${PORT}`.yellow.bold)
);

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    server.close(() => process.exit91);
});