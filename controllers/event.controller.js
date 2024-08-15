const {createNewEvent, getAllEvents, updateAnEvent, deleteAnEvent} = require('../services/event.service');

async function createEvent(req, res) {
    try {
        const {message, status} = await createNewEvent(req);
        res.status(status).send({
            message,
          });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error " + error.message,
          });
    }
}

async function getEvent(req, res) {
    try {
        const {message, status} = await getAllEvents(req);
        res.status(status).send({
            message,
          });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error " + error.message,
          });
    }
}

async function updateEvent(req, res) {
    try {
        const {message, status} = await updateAnEvent(req);
        res.status(status).send({
            message,
          });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error " + error.message,
          });
    }
}

async function deleteEvent(req, res) {
    try {
        const {message, status} = await deleteAnEvent(req);
        res.status(status).send({
            message,
          });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error " + error.message,
          });
    }
}

module.exports = {
    createEvent, getEvent, updateEvent, deleteEvent
}