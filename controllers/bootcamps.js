const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const geocoder = require('../utils/geocoder');

//@desc     Get All Bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = asyncHandler(async (request, response, next) => {
    let query;

    const reqQuery = { ...request.query };

    const removeFields = ['select', 'sort', 'page', 'limit'];

    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    query = Bootcamp.find(JSON.parse(queryStr));

    if (request.query.select) {
        const fields = request.query.select.split(',').join(' ');
        queryStr = query.select(fields);
    }

    if (request.query.sort) {
        const sortBy = request.query.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    const page = parseInt(request.query.page, 10) || 1;
    const limit = parseInt(request.query.imit, 10) || 25;
    const startInx = (page - 1) * limit;
    const endInx = page * limit;
    const total = await Bootcamp.countDocuments();

    query = query.skip(startInx).limit(limit);

    const bootcamps = await query;

    const pagination = {};

    if (endInx < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }

    if (startInx > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }

    response.status(200).json({ success: true, count: bootcamps.length, pagination, data: bootcamps });
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

//@desc     Get Bootcamps In Given Radius
//@route    GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access   Private
exports.getBootcampsInRadius = asyncHandler(async (request, response, next) => {
    const { zipcode, distance } = request.params;

    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    const radius = distance / 3963;

    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    });

    response.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    });
});