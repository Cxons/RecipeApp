/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import coverImage from "../src/assets/images/Picture10.jpg";
import axios from "axios";
import { signOutWithGoogle } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
axios.defaults.baseURL = "http://localhost:3500";
axios.defaults.headers.common["Content-Type"] = "application/json";

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3500/users/current")
  //     .then((res) => console.log("test", res))
  //     .catch((err) => console.log(err));
  // }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3500/recipe/recipes/query?n=1", {
        withCredentials: true,
      })
      .then((res) => setRecipes(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  const navigate = useNavigate();
  function handleSignOUt() {
    signOutWithGoogle(navigate);
  }
  function normalSignOut() {
    axios
      .get("http://localhost:3500/users/logout", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  }

  function handleUpload() {
    navigate("/recipePage/upload", { replace: false });
  }

  return (
    <div className="container">
      <div className="max-w-[100vw] max-h-[110vh]">
        <div className="w-[98.4vw] h-[100vh] relative">
          <img
            src={coverImage}
            alt=""
            className="h-[100%] w-[100%] bg-cover z-0"
          />
        </div>
        <div className="absolute left-0 top-0 w-[98.4vw] h-[100%] font-serif bg-black opacity-[.84] z-10 flex flex-col space-y-[4rem]">
          <div className="w-[100%] h-[20vh] text-white text-3xl flex justify-between items-center justify-center">
            <div className="text-[2rem] text-orange-500 ml-[3rem] italic">
              XONS
            </div>
            <div className="flex w-[70vw] space-x-10 text-[1.3rem] text-orange-500 ml-[30rem]">
              <div>
                <Link to="/">Home</Link>
              </div>
              <div onClick={handleUpload} className="cursor-pointer">
                Upload
              </div>
              <div className="cursor-pointer">Create Schedule</div>
            </div>
            <div
              onClick={normalSignOut}
              className="text-white text-[1.15rem] w-[12rem] cursor-pointer bg-orange-500 text-center mr-8 rounded-md"
            >
              Sign Out
            </div>
          </div>
          <div className="text-[3.7rem]  text-white whitespace-wrap text-pretty w-[100%] flex flex-row-reverse text-orange-800 font-serif">
            <div className="w-[40rem] ml-[49rem] leading-[6rem] text-orange-500">
              Discover Amazing Recipes
            </div>
          </div>
          <div className="self-center">
            <form>
              <input
                type="text"
                placeholder="Enter Recipe"
                className="w-[33rem] h-[2.6rem] rounded-md text-center focus:outline-none text-[1.2rem] bg-white z-50"
              />
              <button className="text-white ml-[3rem] h-[3rem] w-[6rem] bg-orange-500 rounded-md ">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="h-[30vh] w-[98.4vw] mt-[2rem]  text-center text-4xl font-serif text-orange-600">
        TOP RECIPES
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 italic font-serif">
        {recipes.map((recipe) => {
          // console.log(recipe);
          return (
            <div
              key={recipe.id}
              className="bg-white  p-6 rounded-md shadow-md w-[45vw] h-[50rem] mt-[-3rem] border-orange-500 border-[1rem] border-spacing-36 "
            >
              <img
                src={recipe.media}
                alt={recipe.title}
                className="w-full h-[10rem] object-cover mb-4 rounded-md"
              />

              <h2 className="text-xl font-semibold mb-2 text-orange-500">
                {recipe.title}
              </h2>
              <p className="text-gray-600 mb-4 text-orange-500">
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
