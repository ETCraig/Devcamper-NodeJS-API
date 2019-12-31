const Bootcamp = require('../models/Bootcamp');
const Course = require('../models/Course');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

//@desc     Get All Courses
//@route    GET /api/v1/courses
//@route    GET /api/v1/bootcamps/:bootcampId/courses
//@access   Public
exports.getCourses = asyncHandler(async (request, response, next) => {
    let query;

    if (request.params.bootcampId) {
        query = Course.find({ bootcamp: request.params.bootcampId });
    } else {
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'
        });
    }

    const courses = await query;

    response.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    });
});

//@desc     Get Single Course
//@route    GET /api/v1/courses/:id
//@access   Public
exports.getCourse = asyncHandler(async (request, response, next) => {
    const course = await (await Course.findById(request.params.id)).populated({
        path: 'bootcamp',
        select: 'name description'
    });

    if (!course) {
        return next(new ErrorResponse(`No Course With _id Of ${request.params.id}`, 404));
    }

    response.status(200).json({
        success: true,
        data: course
    });
});

//@desc     Add Single Course
//@route    POST /api/v1/bootcamps/:bootcampId/courses
//@access   Private
exports.createCourse = asyncHandler(async (request, response, next) => {
    request.body.bootcamp = request.params.bootcampId;

    const bootcamp = await (await Course.findById(request.params.bootcampId)).populated({
        path: 'bootcamp',
        select: 'name description'
    });

    if (!bootcamp) {
        return next(new ErrorResponse(`No Course With _id Of ${request.params.bootcampId}`, 404));
    }

    const course = await Course.create(request.body);

    response.status(200).json({
        success: true,
        data: course
    });
});

//@desc     Update Single Course
//@route    PUT /api/v1/courses/:id
//@access   Private
exports.updateCourse = asyncHandler(async (request, response, next) => {
    let course = await Course.findById(request.params.id);

    if (!course) {
        return next(new ErrorResponse(`No Course With _id Of ${request.params.bootcampId}`, 404));
    }

    course = await Course.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true
    });

    response.status(200).json({
        success: true,
        data: course
    });
});

//@desc     Delete Single Course
//@route    DELETE /api/v1/courses/:id
//@access   Private
exports.deleteCourse = asyncHandler(async (request, response, next) => {
    let course = await Course.findById(request.params.id);

    if (!course) {
        return next(new ErrorResponse(`No Course With _id Of ${request.params.bootcampId}`, 404));
    }

    await course.remove();

    response.status(200).json({
        success: true,
        data: course
    });
});