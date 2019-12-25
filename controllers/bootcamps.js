const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

//@desc     Get All Bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = asyncHandler(async (request, response, next) => {
    const bootcamps = await Bootcamp.find();
    response.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
});

//@desc     Get Single Bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = asyncHandler(async (request, response, next) => {
    const bootcamp = await Bootcamp.findById(request.params.id);

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp Not Found With _id Of ${request.params.id}`, 404));
    }

    response.status(200).json({ success: true, data: bootcamp });
});

//@desc     Create New Bootcamp
//@route    POST /api/v1/bootcamps
//@access   Private
exports.createBootcamp = asyncHandler(async (request, response, next) => {
    const newBootcamp = await Bootcamp.create(request.body);
    response.status(201).json({ success: true, data: newBootcamp });
});

//@desc     Update A Bootcamp
//@route    PUT /api/v1/bootcamps/:id
//@access   Private
exports.updateBootcamp = asyncHandler(async (request, response, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true
    });

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp Not Found With _id Of ${request.params.id}`, 404));
    }

    response.status(200).json({ success: true, data: bootcamp });
});

//@desc     Delete A Bootcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access   Private
exports.deleteBootcamp = asyncHandler(async (request, response, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(request.params.id);

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp Not Found With _id Of ${request.params.id}`, 404));
    }

    response.status(200).json({ success: true, data: {} });
});