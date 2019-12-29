const Course = require('../models/Course');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

//@desc     Get All Course
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