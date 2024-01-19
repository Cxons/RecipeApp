/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import image15 from "../src/assets/images/image15.jpg";
import axios from "axios";
import { signOutWithGoogle } from "./firebase";
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = "http://localhost:3500";
axios.defaults.headers.common["Content-Type"] = "application/json";

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  console.log(image15);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3500/users/current")
  //     .then((res) => console.log("test", res))
  //     .catch((err) => console.log(err));
  // }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3500/recipe/recipes/query?n=30", {
        withCredentials: true,
      })
      .then((res) => setRecipes(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  const navigate = useNavigate();
  function handleSignOUt() {
    signOutWithGoogle(navigate);
  }
  function handleUpload() {
    navigate("/recipePage/upload", { replace: false });
  }

  return (
    <div className="container mx-auto my-8">
      <div className="flex w-[90vw] justify-between">
        <h1 className="text-3xl font-semibold mb-6">Discover Recipes</h1>
        <div
          onClick={handleUpload}
          className="bg-[#2A3439] w-[9rem] h-[3rem] text-white px-4 py-2 rounded-md text-center flex items-center justify-center hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
        >
          UPLOAD
        </div>
        <div
          onClick={handleSignOUt}
          className="bg-[#2A3439] w-[7rem] h-[3rem] text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
        >
          SIGN OUT
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 italic font-serif">
        {recipes.map((recipe) => {
          // console.log(recipe);
          return (
            <div key={recipe.id} className="bg-white p-6 rounded-md shadow-md">
              <img
                src={recipe.media}
                alt={recipe.title}
                className="w-full h-[10rem] object-cover mb-4 rounded-md"
              />

              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-600 mb-4">
                <span className="italic font-serif">{"Ingredients\n"}</span>:
                {recipe.ingredients}
              </p>

              <p className="text-gray-700 mb-4">
                Preparation:{recipe.preparation}
              </p>

              <p className="text-gray-500">Credit: {recipe.credit}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecipePage;
