const express = require("express");
const authenticateUser = require("../middleWare/authHandler");
const UserRouter = express.Router();
const {
  handleRegister,
  handleLogin,
  handleCurrent,
  handleLogOUt,
} = require("../handleRoutes/handleUserRoute");
const {
  verifyAndSendEmailCode,
  verifyAuthCode,
  changePassword,
} = require("../handleRoutes/handleResetPassword");

UserRouter.post("/register", handleRegister);
UserRouter.route("/login").post(handleLogin);
UserRouter.get("/current", handleCurrent);
UserRouter.get("/logout", handleLogOUt);
UserRouter.post("/forgetPassword", verifyAndSendEmailCode);
UserRouter.post("/verifyAuth", verifyAuthCode);
UserRouter.post("/changePassword", changePassword);

module.exports = UserRouter;
