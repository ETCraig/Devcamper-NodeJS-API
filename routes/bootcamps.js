const express = require('express');
const Router = express.Router();
const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius
} = require('../controllers/bootcamps');
const courseRouter = require('./courses');

Router.use('/:bootcampId/courses', courseRouter);

Router.route('/')
    .get(getBootcamps)
    .post(createBootcamp);

Router.route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

Router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

module.exports = Router;