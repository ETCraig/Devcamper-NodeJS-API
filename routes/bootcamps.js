const express = require('express');
const Router = express.Router();
const { 
    getBootcamps,
    getBootcamps,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp
} = require('../controllers/bootcamps');

Router.route('/')
    .get(getBootcamps)
    .post(createBootcamp);

Router.route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

module.exports = Router;