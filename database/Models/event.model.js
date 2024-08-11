const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const participantSchema = new Schema( {
    name: {
        type: String,
        required: [true, 'Participant Name is required'],
        maxLength: 255,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        maxLength: 255,
        lowercase: true,
        trim: true,
        validate: {
            validator: (email) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: 'Please enter a valid email address.',
        }
    }
});


const eventSchema = new Schema( {
    eventtitle: {
        type: String,
        required: [true, 'Title is required'],
        maxLength: 255,
        minLength: 10,
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxLength: 1000,
        trim: true,
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        maxLength: 255,
        trim: true,
    },
    participants: [participantSchema],
});

const eventModel = mongoose.model('event', eventSchema);
module.exports = eventModel;