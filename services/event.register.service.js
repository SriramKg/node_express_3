const eventModel = require("../database/Models/event.model");

async function registerUserForEvent(req) {
    try {
        const {id} = req.params;
        
        const {name, email} = req.body;
        if(!name || !email) {
            return {
                message: "Name and email are required",
                status: 400,
            };
        }
        if(req.email !== email) {
            return {
                message: "You are not authorized to register other Users for this event",
                status: 401,
            };
        }

        const existingEvent = await eventModel.findById(id);
        if(!existingEvent) {
            return {
                message: "Event not found",
                status: 404,
            };
        }
        const existingParticipant = existingEvent.participants.find(participant => participant.email === email);
        if(existingParticipant) {
            return {
                message: "User is already registered for this event",
                status: 400,
            };
        }
        const participant = {
            name,
            email,
        };
        existingEvent.participants.push(participant);
        await existingEvent.save();
        return {
            message: "User registered successfully for the event",
            status: 200,
        }
    }
    catch (error) {
        throw new Error("ERROR REGISTERING USER FOR EVENT!!! " + error);
    }
}
module.exports = registerUserForEvent;