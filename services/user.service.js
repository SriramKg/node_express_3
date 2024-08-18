const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../database/Models/user.model");

async function registerNewUser(body) {
  try {
    const { username, email, password, roles, number, gender } = body;
    if (!email) {
      return {
        message: "Email field is required",
        status: 400,
      };
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return {
        message: "Email already exists. You are already a registered user. Please try to login",
        status: 400,
      };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const userObj = new userModel({
      username,
      email,
      password: hashPassword,
      roles,
      number,
      gender,
    });

    await userObj.save();
    return {
      message: "User Registered Successfully " + userObj._id,
      status: 201,
    };
  } catch (error) {
    throw new Error("USER NOT REGISTERED !!!" + error);
  }
}

async function loginOurUser(body) {
  try {
    const secret = process.env.SECRET_JWT;
    const { email, password } = body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return {
        message: "User not found. Please check your email address and try again",
        status: 404,
      };
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (validatePassword) {
      const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles,
        number: user.number,
        gender: user.gender,
      };
      const token = jwt.sign(payload, secret, { expiresIn: "2h" });
      return {
        message: `You are Logged In Successfully. Welcome ${user.username} !`,
        status: 200,
        token: token,
      };
    } else {
      return {
        message: "Invalid Password. Please try again",
        status: 401,
      };
    }
  } catch (error) {
    throw new Error("USER CANNOT LOGIN !!!" + error);
  }
}

module.exports = {
  registerNewUser,
  loginOurUser,
};
