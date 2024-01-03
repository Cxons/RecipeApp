const express = require("express");
const authenticateUser = require("../middleWare/authHandler");
const UserRouter = express.Router();
const {
  handleRegister,
  handleLogin,
  handleCurrentUser,
} = require("../handleRoutes/handleUserRoute");

UserRouter.post("/register", handleRegister);
UserRouter.route("/login").post(handleLogin);
UserRouter.get("/current", authenticateUser, handleCurrentUser);

module.exports = UserRouter;
