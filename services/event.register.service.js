const eventModel = require("../database/Models/event.model");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oauth2 = google.auth.OAuth2;

const oauth2Client = new oauth2({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: "https://developers.google.com/oauthplayground",
});
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

async function registerUserForEvent(req) {
  try {
    const { id } = req.params;

    const { name, email } = req.body;
    if (!name || !email) {
      return {
        message: "Name and email are required",
        status: 400,
      };
    }
    if (req.email !== email) {
      return {
        message:
          "You are not authorized to register other Users for this event",
        status: 401,
      };
    }

    const existingEvent = await eventModel.findById(id);
    if (!existingEvent) {
      return {
        message: "Event not found",
        status: 404,
      };
    }
    const existingParticipant = existingEvent.participants.find(
      (participant) => participant.email === email
    );
    if (existingParticipant) {
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

    sendEmail(participant, existingEvent);
    return {
      message: "User registered successfully for the event",
      status: 200,
    };
  } catch (error) {
    throw new Error("ERROR REGISTERING USER FOR EVENT!!! " + error);
  }
}

async function sendEmail(participant, existingEvent) {
  const transporter = await createTransport();
  const info = await transporter.sendMail({
    from: "kgsriram99@gmail.com",
    to: participant.email,
    subject: "Event Registration Confirmation",
    text: `Dear ${participant.name},


          You have successfully registered for the ${existingEvent.eventtitle} event which is scheduled on ${existingEvent.date} at ${existingEvent.location}.
          Thank you for your participation!


          Best regards,
          Event Organizer`,
  });
  console.log("Message sent: %s", info.messageId);
}

async function createTransport() {
  const accessToken = await oauth2Client.getAccessToken();
  console.log(accessToken);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "kgsriram99@gmail.com",
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });
  return transporter;
}

module.exports = registerUserForEvent;
