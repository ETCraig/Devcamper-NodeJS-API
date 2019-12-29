const express = require('express');
const { getCourses } = require('../controllers/courses');

const Router = express.Router({ mergeParams: true });

Router.route('/').get(getCourses);

module.exports = Router;