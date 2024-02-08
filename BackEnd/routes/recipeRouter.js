const express = require("express");
const recipeRouter = express.Router();
const {
  handleRecipeUploads,
  getRecipe,
  getRecipeViaFilter,
  getOneRecipe,
} = require("../handleRoutes/handleRecipeRoute");

recipeRouter.route("/upload").post(handleRecipeUploads);
recipeRouter.route("/recipes/query").get(getRecipe);
recipeRouter.route("/recipes/filterRecipes").get(getRecipeViaFilter);
recipeRouter.route("/recipes/getOne").post(getOneRecipe);

module.exports = recipeRouter;
