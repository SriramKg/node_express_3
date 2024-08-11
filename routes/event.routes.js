const express = require('express');
const router = express.Router();
const {createEvent} = require('../controllers/event.controller');
const validateUser = require('../middlewares/validate.middleware');
const authorizeUser = require('../middlewares/authorize.middleware');


router.post('/create',validateUser ,authorizeUser, createEvent);

module.exports = router;