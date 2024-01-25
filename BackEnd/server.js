const express = require("express");
const connect = require("./config/connection");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5002;
const UserRouter = require("./routes/userRoutes");
const recipeRouter = require("./routes/recipeRouter");
const errHandler = require("./middleWare/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authenticateUser = require("./middleWare/authHandler");
connect();

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", UserRouter);
// app.use(authenticateUser);
app.use("/recipe", recipeRouter);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const allowedOrigins = ["http://localhost:5173"];
app.use(cors({ origin: allowedOrigins }));
app.options("*", cors());
app.use("/", errHandler);

app.listen(3500, () => {
  console.log(`server listening at port ${port}`);
});
