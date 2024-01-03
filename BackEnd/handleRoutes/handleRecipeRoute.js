const asyncHandler = require("express-async-handler");
const recipeSchema = require("../Models/recipeModel");

const handleRecipeUploads = asyncHandler(async (req, res) => {
  const { title, imgUrl, ingredients, preparation, credit } = req.body;
  if (!title || !ingredients || !preparation || !credit) {
    res.status(400);
    throw new Error("Only file field is optional");
  }
  console.log("the req body", req.body);
  const newRecipe = await recipeSchema.create({
    title: title,
    media: imgUrl,
    ingredients: ingredients,
    preparation: preparation,
    credit: credit,
  });
  // console.log(newRecipe);

  res.status(200).json({ message: "Image successfully gotten" });
});

const getRecipe = asyncHandler(async (req, res) => {
  const recipes = await recipeSchema.find();
  console.log(Schemas);
  res.status(200).json({ message: "hey beautiful" });
});
module.exports = { handleRecipeUploads, getRecipe };
