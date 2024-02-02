const express = require("express");
const recipeRouter = express.Router();
const {
  handleRecipeUploads,
  getRecipe,
  getRecipeViaFilter,
} = require("../handleRoutes/handleRecipeRoute");

recipeRouter.route("/upload").post(handleRecipeUploads);
recipeRouter.route("/recipes/query").get(getRecipe);
recipeRouter.route("/recipes/filterRecipes").get(getRecipeViaFilter);

module.exports = recipeRouter;
