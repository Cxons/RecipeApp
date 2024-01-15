const express = require("express");
const recipeRouter = express.Router();
const {
  handleRecipeUploads,
  getRecipe,
} = require("../handleRoutes/handleRecipeRoute");

recipeRouter.route("/upload").post(handleRecipeUploads);
recipeRouter.route("/recipes/query").get(getRecipe);

module.exports = recipeRouter;
