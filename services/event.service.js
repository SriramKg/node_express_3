const eventModel = require('../database/Models/event.model');

async function createNewEvent(req) {
    try {
        const {eventtitle, description, date, location, participants} = req.body;
        const existingEvent = await eventModel.findOne({ eventtitle, date, location });
        if(existingEvent) {
            return {
                message: "Event is already registered at this location on this date!",
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

async function getAllEvents(req) {
    try {
        const events = await eventModel.find({});
        return {
            message: events,
            status: 200,
        };
    } catch (error) {
        throw new Error("ERROR FETCHING EVENTS!!! " + error);
    }
}

async function getAnParticularEvent(req) {
    try {
        const {id} = req.params;
        const existingEvent = await eventModel.findById(id);
        if(!existingEvent) {
            return {
                message: "Event not found",
                status: 404,
            };
        }
        return {
            message: existingEvent,
            status: 200,
        };

    } catch (error) {
        throw new Error("ERROR FETCHING EVENTS!!! " + error);
    }
    
}

async function updateAnEvent(req) {
    try {
        const {id} = req.params;
        const {eventtitle, description, date, location, participants} = req.body;
        const existingEvent = await eventModel.findByIdAndUpdate(id, {eventtitle, description, date, location, participants}, {new: true});
        if(!existingEvent) {
            return {
                message: "Event not found",
                status: 404,
            };
        }
        return {
            message: "Event updated successfully",
            status: 200,
        };
    } catch (error) {
        throw new Error("ERROR UPDATING EVENT!!! " + error);
    }
}

async function deleteAnEvent(req) {
    try {
        const {id} = req.params;
        const existingEvent = await eventModel.findByIdAndDelete(id);
        if(!existingEvent) {
            return {
                message: "Event not found",
                status: 404,
            };
        }
        return {
            message: "Event deleted successfully",
            status: 200,
        };
    } catch (error) {
        throw new Error("ERROR DELETING EVENT!!! " + error);
    }
}

module.exports = {
    createNewEvent, getAllEvents, updateAnEvent, deleteAnEvent, getAnParticularEvent
}