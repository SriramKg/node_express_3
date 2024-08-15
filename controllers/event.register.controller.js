const registerUserForEvent = require('../services/event.register.service');

async function registerForEvent(req, res) {
    try {
        const {message, status} = await registerUserForEvent(req);
        res.status(status).send({
            message,
          });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error " + error.message,
          });
    }
}

module.exports = registerForEvent;