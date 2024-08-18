const express = require('express');
const router = express.Router();
const {createEvent, getEvent, updateEvent, deleteEvent, getAnEvent} = require('../controllers/event.controller');
const validateUser = require('../middlewares/validate.middleware');
const authorizeUser = require('../middlewares/authorize.middleware');
const registerForEvent = require('../controllers/event.register.controller');


router.post('/create',validateUser ,authorizeUser, createEvent);
router.get('/',validateUser ,authorizeUser, getEvent);
router.get('/:id',validateUser ,authorizeUser, getAnEvent);
router.put('/update/:id',validateUser ,authorizeUser, updateEvent);
router.delete('/delete/:id',validateUser ,authorizeUser, deleteEvent);
router.post('/:id/register',validateUser, registerForEvent);

module.exports = router;