const asyncHandler = require("express-async-handler");
const recipeSchema = require("../Models/recipeModel");
const recipeModel = require("../Models/recipeModel");

const handleRecipeUploads = asyncHandler(async (req, res) => {
  const { title, imgUrl, ingredients, preparation, credit, country } = req.body;
  if (!title || !ingredients || !preparation || !credit || !country) {
    res.status(400);
    throw new Error("Only file field is optional");
  }
  console.log("the req body", req.body);
  const newRecipe = await recipeSchema.create({
    title: title.toLowerCase(),
    media: imgUrl,
    ingredients: ingredients.toLowerCase(),
    preparation: preparation.toLowerCase(),
    credit: credit.toLowerCase(),
    country: country.toLowerCase(),
  });
  // console.log(newRecipe);

  res.status(200).json({ message: "Image successfully gotten" });
});

const getRecipe = asyncHandler(async (req, res) => {
  const { n } = req.query;
  const getRecipes = await recipeSchema.find();
  const requestedRecipes = getRecipes.splice(0, n);
  res
    .status(200)
    .json({ message: "Request successful", data: requestedRecipes });
});
const getRecipeViaFilter = asyncHandler(async (req, res) => {
  const { similar } = req.query;
  console.log(similar);
  const data = await recipeSchema.find();
  const match = data.filter((item) => item.title.startsWith(similar));
  console.log("the match", match[0].title);
  if (match.length === 0) {
    res.status(404);
    throw new Error("Recipe not found");
  }
  res.status(200).json({ message: "request gotten", data: match });
});
module.exports = { handleRecipeUploads, getRecipe, getRecipeViaFilter };
