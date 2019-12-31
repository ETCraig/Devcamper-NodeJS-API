const express = require('express');
const { 
    getCourses, 
    getCourse, 
    createCourse, 
    updateCourse,
    deleteCourse
} = require('../controllers/courses');

const Router = express.Router({ mergeParams: true });

Router.route('/')
    .get(getCourses)
    .post(createCourse);

Router.route('/:id')
    .get(getCourse)
    .put(updateCourse)
    .delete(deleteCourse);

module.exports = Router;