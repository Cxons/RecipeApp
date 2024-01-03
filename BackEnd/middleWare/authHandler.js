const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const authenticateUser = asyncHandler(async (req, res, next) => {
  const authToken = req.headers.authorization.split(" ")[1];
  if (!authToken) {
    res.status(403);
    throw new Error("no tokens found");
  }
  jwt.verify(authToken, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      res.status(401);
      throw new Error("user not authorzed");
    }
    req.user = user;
    res.status(200).json({ user: user });
    next();
  });
});

module.exports = authenticateUser;
