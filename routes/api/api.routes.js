const express = require('express');
const fileController = require('./../../controllers/api/file.controller');
const fileUpload = require('./../../middleware/file.middleware');
const routes = express.Router();

routes.get('/loadTrend',fileController.loadTrend)

// fileUpload.single('fileToUpload')

routes.get('/loadAlarm',fileController.loadAlarm)

module.exports = routes;