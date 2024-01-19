const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const authenticateUser = asyncHandler(async (req, res, next) => {
  const { accessToken } = req.cookies;
  console.log(req.cookies);
  if (!accessToken) {
    res.status(404);
    throw new Error("no tokens found");
  }
  jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      res.status(401);
      throw new Error("user not authorzed");
    }
    req.user = user;
    console.log(req.user);
    console.log("successfull for auth");
    next();
  });
});

module.exports = authenticateUser;
