const express = require('express');
const router = express.Router();

const event_controller = require('../controllers/eventController');
const image_controller = require('../controllers/imageController');

router.get('/', event_controller.event_list);
router.get('/image/:id', image_controller.image)

module.exports = router;