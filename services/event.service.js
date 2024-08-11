const eventModel = require('../database/Models/event.model');

async function createNewEvent(req) {
    try {
        const {eventtitle, description, date, location, participants} = req.body;
        const existingEvent = await eventModel.findOne({ eventtitle, date, location });
        if(existingEvent) {
            return {
                message: "Event is already registered at this location on this date",
                status: 400,
            };
        }
        const eventObj = new eventModel({
            eventtitle,
            description,
            date,
            location,
            participants,
        });

        await eventObj.save();
        return {
            message: "Event Created Successfully " + eventObj._id,
            status: 201,
        };

    } catch (error) {
        throw new Error("EVENT NOT REGISTERED !!!" + error);
    }
}

module.exports = {
    createNewEvent,
}