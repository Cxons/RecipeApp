const express = require("express");
const connect = require("./config/connection");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5002;
const UserRouter = require("./routes/userRoutes");
const recipeRouter = require("./routes/recipeRouter");
const errHandler = require("./middleWare/errorHandler");
const cors = require("cors");
connect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", UserRouter);
app.use("/recipe", recipeRouter);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Adjust this to your frontend URL in production
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
