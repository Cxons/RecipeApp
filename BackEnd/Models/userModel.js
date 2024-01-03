const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name field required"],
    },
    email: {
      type: String,
      required: [true, "email field required"],
    },
    password: {
      type: String,
      required: [true, "password field required"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("users", userSchema);
