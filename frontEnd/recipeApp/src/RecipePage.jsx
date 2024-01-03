/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes from the server or your database
    // For demonstration purposes, I'm using a dummy data array
    const dummyData = [
      {
        id: 1,
        title: "Spaghetti Bolognese",
        ingredients: "Ground beef, tomatoes, onion, garlic, spaghetti",
        preparation:
          "Cook ground beef, sauté onions and garlic, add tomatoes, mix with cooked spaghetti.",
        image: "spaghetti.jpg",
        credit: "Chef John Doe",
      },
      {
        id: 2,
        title: "Chicken Alfredo",
        ingredients: "Chicken breast, fettuccine, heavy cream, Parmesan cheese",
        preparation:
          "Cook chicken, boil fettuccine, mix with heavy cream and Parmesan cheese.",
        image: "alfredo.jpg",
        credit: "Chef Jane Smith",
      },
      {
        id: 3,
        title: "Chicken Alfredo",
        ingredients: "Chicken breast, fettuccine, heavy cream, Parmesan cheese",
        preparation:
          "Cook chicken, boil fettuccine, mix with heavy cream and Parmesan cheese.",
        image: "alfredo.jpg",
        credit: "Chef Jane Smith",
      },
      {
        id: 4,
        title: "Chicken Alfredo",
        ingredients: "Chicken breast, fettuccine, heavy cream, Parmesan cheese",
        preparation:
          "Cook chicken, boil fettuccine, mix with heavy cream and Parmesan cheese.",
        image: "alfredo.jpg",
        credit: "Chef Jane Smith",
      },
      // Add more recipes as needed
    ];

    setRecipes(dummyData);
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-semibold mb-6">Discover Recipes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white p-6 rounded-md shadow-md">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-32 object-cover mb-4 rounded-md"
            />

            <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
            <p className="text-gray-600 mb-4">{recipe.ingredients}</p>

            <p className="text-gray-700 mb-4">{recipe.preparation}</p>

            <p className="text-gray-500">Credit: {recipe.credit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipePage;
