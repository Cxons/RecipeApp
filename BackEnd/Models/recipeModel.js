const mongoose = require("mongoose");
const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "recipe title required"],
    },
    media: {
      type: String,
    },
    ingredients: {
      type: String,
      required: [true, "ingredients field required"],
    },
    preparation: {
      type: String,
      required: [true, "Please show how you prepared that wonderful meal"],
    },
    credit: {
      type: String,
      required: [true, "C'mon now don't be shy. Who made this wonderful food"],
    },
    country: {
      type: String,
      required: [true, "Please input the region of this amazing meal"],
    },
    
  },
  { timestamp: true }
);

module.exports = mongoose.model("recipe", recipeSchema);
