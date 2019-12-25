const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (error, request, response, next) => {
    let err = { ...error };

    err.message = error.message;

    if (error.name === 'CastError') {
        const message = `Resource Not Found With _id Of ${error.value}`;
        err = new ErrorResponse(message, 404);
    }

    if(error.code === 11000) {
        const message = 'Duplicate Field Value Entered';
        err = new ErrorResponse(message, 400);
    }

    if(error.name === 'ValidationError') {
        const message = Object.values(error.errors).map(val => val.message);
        err = new ErrorResponse(message, 400);
    }

    response.status(err.statusCode || 500).json({
        succuss: false,
        error: err.message || 'Server Error'
    });
}

module.exports = errorHandler;