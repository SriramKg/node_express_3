const {createNewEvent} = require('../services/event.service');

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

module.exports = {
    createEvent,
}