const asyncHandler = require("express-async-handler");
const nodeMailer = require("nodemailer");
const userModel = require("../Models/userModel");
const crypto = require("crypto");
const env = require("dotenv").config();
const bcrypt = require("bcrypt-nodejs");

const verifyAndSendEmailCode = asyncHandler(async (req, res) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MY_EMAIL,
      pass: process.env.EMAIL_PASS,
      clientId: process.env.NODEMAILER_CLIENT_ID,
      clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
      refreshToken: process.env.EMAIL_REFRESH_TOKEN,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const { email } = req.body;
  console.log("initial email", email);
  const user = await userModel.findOne({ email });
  console.log("the user email from db is", user);
  if (!user) {
    res.status(401);
    throw new Error("Email not found");
  }
  const verificationCode = crypto.randomBytes(3).toString("hex");
  console.log(verificationCode);
  const updatedUser = await userModel.findOneAndUpdate(
    { email: email },
    {
      $set: { verificationCode: verificationCode },
    },
    { upsert: true }
  );

  console.log("this is the verified user", updatedUser);

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: user.email,
    subject: "Forgot Password Verification Code",
    text: `Your verification Code is ${verificationCode}`,
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
      res.status(401);
      throw new Error("error sending the email");
    }
    console.log(data, "the email was has been sent successfully");
  });
  res.cookie("email", email).status(200).json({ message: user.email });
});

const verifyAuthCode = asyncHandler(async (req, res) => {
  const { authCode } = req.body;
  const { email } = req.cookies;
  console.log("the received cookie email", email);
  console.log("the auth code", authCode);
  const user = await userModel.findOne({ email: email });
  console.log("from database email", user.email);
  if (!user.email) {
    res.status(401);
    throw new Error("user not allowed");
  }
  if (!authCode) {
    res.status(400);
    throw new Error("Auth Code required");
  }
  if (user.verificationCode !== authCode) {
    res.status(400);
    throw new Error("Wrong Verification Code");
  }
  res.status(200).json({ message: "User can now change password" });
});

const changePassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;
  console.log("the new password", newPassword);
  const { email } = req.cookies;
  console.log("the cookie email", email);
  if (!newPassword) {
    res.status(400);
    throw new Error("Password field compulsory");
  }
  const getUser = await userModel.findOne({ email: email });
  console.log("the current user", getUser);
  if (!getUser) {
    res.status(403);
    throw new Error("User not allowed");
  }
  //used hashSync to avoid callback
  const hashedPassword = bcrypt.hashSync(newPassword, process.env.SALT);
  console.log("new hashedPassword and salt", hashedPassword, process.env.SALT);
  const setPassword = await userModel.findOneAndUpdate(
    { email: email },
    {
      $set: { password: hashedPassword },
    },
    { upsert: true }
  );
  res.clearCookie("email");
  console.log("config for set password", setPassword);
  res.status(200).json({ message: "Password Updated Sucessfully" });
});

module.exports = { verifyAndSendEmailCode, verifyAuthCode, changePassword };
