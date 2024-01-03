const mongoose = require("mongoose");
const userSchema = require("../Models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

const handleRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields mandatory");
  }
  const existingEmail = await userSchema.findOne({ email: email });
  if (existingEmail) {
    res.status(400);
    throw new Error("Email already exists");
  }
  const salt = bcrypt.genSaltSync(10);
  //used hashSync to avoid callback
  const hashedPassword = bcrypt.hashSync(password, salt);
  const user = await userSchema.create({
    name: name,
    email: email,
    password: hashedPassword,
  });
  res.status(201).json({
    message: "Successfully signed up",
    data: {
      name: user.name,
      email: user.email,
    },
  });
});

const handleLogin = asyncHandler(async (req, res) => {
  console.log(req);
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields mandatory");
  }
  const checkEmail = await userSchema.findOne({ email: email });
  if (!checkEmail) {
    res.status(401);
    throw new Error("Email invalid. Signed up Already?");
  }
  console.log("the email", checkEmail);
  const userPassword = checkEmail.password;
  const checkPassword = bcrypt.compareSync(password, userPassword);
  if (checkPassword === false) {
    res.status(401);
    throw new Error("Password incorrect");
  }
  const singleEmail = checkEmail.email;
  //creating the body to be put on the jwt sign
  const jwtBody = { name: checkEmail.name, email: singleEmail };
  const accessToken = jwt.sign(jwtBody, process.env.ACCESS_TOKEN);
  res.status(200).json({
    message: "User signed in successfully",
    accessToken: accessToken,
    name: checkEmail.name,
  });
});
const handleCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = { handleRegister, handleLogin, handleCurrentUser };
