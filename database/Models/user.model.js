const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: "string",
    required: [true, "Username is required"],
    maxLength: 255,
    minLength: 4,
    trim: true,
  },
  email: {
    type: "string",
    required: [true, "Email is required"],
    lowercase: true,
    maxLength: 255,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    trim: true,
  },
  password: {
    type: "string",
    required: true,
    minLength: [6, "Password must be at least 6 characters"],
  },
  roles: {
    type: [String],
    default: ["user"],
  },
  number: {
    type: String,
    required: [true, "Phone number is required"],
    match: /^\d{10}$/,
    min: 10,
    max: 10,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: [true, "Gender is required"],
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
