const express = require('express');
const Router = express.Router();

Router.get('/', (req, res) => {
    res.status(200).json({ success: true, msg: 'Show All Bootcamps' });
});

Router.get('/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Get Bootcamp ${req.params.id}` });
});

Router.post('/', (req, res) => {
    res.status(200).json({ success: true, msg: 'Create New Bootcamp' });
});

Router.put('/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Update Bootcamp ${req.params.id}` });
});

Router.delete('/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Delete Bootcamp ${req.params.id}` });
});

module.exports = Router;