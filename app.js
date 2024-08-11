const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
dotenv.config();

const userRoutes = require('./routes/user.routes');
const eventRoutes = require('./routes/event.routes');

app.use("/users", userRoutes);
app.use("/events", eventRoutes);

const connectionString = process.env.MONGO_URI;
const db = process.env.db;
mongoose.connect(connectionString+db).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});

module.exports = app;