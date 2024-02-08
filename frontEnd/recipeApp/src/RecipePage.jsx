/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import coverImage from "../src/assets/images/Picture10.jpg";
import axios from "axios";
import { signOutWithGoogle } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
axios.defaults.baseURL = "http://localhost:3500";
axios.defaults.headers.common["Content-Type"] = "application/json";

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [submitRecipeContent, setSubmitRecipeContent] = useState();
  const [checkInputEmpty, setCheckInputEmpty] = useState(true);
  const ref = useRef();
  useEffect(() => {
    axios
      .get("http://localhost:3500/recipe/recipes/query?n=4", {
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
  function handleSearchChange(e) {
    e.preventDefault();
    console.log("the ref value", ref.current.value);
    if (e.target.value === "") {
      setCheckInputEmpty(false);
    }
    if (e.target.value) {
      setCheckInputEmpty(true);
      setSubmitRecipeContent(e.target.value);
      setTimeout(() => {
        axios
          .get(
            `http://localhost:3500/recipe/recipes/filterRecipes?similar=${e.target.value}&n=3`,
            {
              withCredentials: true,
            }
          )
          .then((res) => setSearchResult(res.data.data))
          .catch((err) => console.log(err));
      }, 1000);
    }
  }
  function handleSubmitRecipe(e) {
    e.preventDefault();
    axios
      .post(
        `http://localhost:3500/recipe/recipes/getOne`,
        { recipe: ref.current.value },
        { withCredentials: true }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  return (
    <div className="container ">
      <div className="max-w-[100vw] max-h-[110vh]">
        <div className="w-[98.4vw] h-[100vh] relative">
          <img
            src={coverImage}
            alt=""
            className="h-[100%] w-[100%] bg-cover z-0"
          />
        </div>
        <div className="absolute left-0 top-0 w-[98.4vw] h-[100%] font-serif bg-black bg-opacity-[.59] z-10 flex flex-col space-y-[4rem]">
          <div className="w-[100%] h-[20vh] text-white text-3xl flex justify-between items-center ">
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
              <div className="cursor-pointer">
                <Link to="/createSchedule">Create Schedule</Link>
              </div>
            </div>
            <div
              onClick={normalSignOut}
              className="text-white text-[1.15rem] w-[12rem] cursor-pointer bg-orange-500 text-center mr-8 rounded-md"
            >
              Sign Out
            </div>
          </div>
          <div className="text-[3.7rem]   whitespace-wrap text-pretty w-[100%] flex flex-row-reverse text-orange-800 font-serif">
            <div className="w-[40rem] ml-[49rem] leading-[6rem] text-white">
              Discover Amazing Recipes
            </div>
          </div>
          <div className="self-center">
            <form className="">
              <input
                type="text"
                ref={ref}
                placeholder="Enter Recipe"
                onChange={handleSearchChange}
                className="w-[33rem] h-[2.6rem] rounded-md text-center focus:outline-none text-[1.2rem] bg-white z-50"
              />
              <button
                onClick={handleSubmitRecipe}
                className="text-white ml-[3rem] h-[3rem] w-[6rem] bg-orange-500 rounded-md "
              >
                Search
              </button>
              {checkInputEmpty &&
                searchResult &&
                searchResult.map((item) => {
                  return (
                    <div
                      className="bg-orange-500 text-white text-3xl cursor-pointer mt-[.2rem] text-center rounded-sm border-2"
                      key={Math.random()}
                      onClick={() => {
                        ref.current.value = item.title;
                        setSearchResult([]);
                      }}
                    >
                      {item.title}
                    </div>
                  );
                })}
            </form>
          </div>
        </div>
      </div>
      <div className="h-[30vh] w-[98.4vw] mt-[2rem]  text-center text-4xl font-serif text-orange-600">
        TOP RECIPES
      </div>
      <div className="grid grid-cols-1 mx-auto w-full md:grid-cols-2 lg:grid-cols-2 gap-6 gap-y-[9rem] italic font-serif">
        {recipes.map((recipe) => {
          // console.log(recipe);
          return (
            <div
              key={Math.random()}
              className="bg-white rounded-md justify-center ml-[4.5rem] shadow-md w-[40vw] h-[20rem] mt-[-5rem] border-orange-500 border-[.3rem] border-spacing-36 flex "
            >
              <img
                src={recipe.media}
                alt={recipe.title}
                className="w-[9rem] h-[9rem] object-cover mb-4 rounded-md"
              />
              <div className="ml-[1rem]">
                <h2 className="font-semibold mb-2 text-orange-500 text-4xl">
                  {recipe.title}
                </h2>
                <p className=" mb-4 text-orange-500">
                  <span className="italic font-serif">{"Ingredients\n"}</span>:
                  {recipe.ingredients}
                </p>
                <p className="text-gray-700 mb-4 line-clamp-1">
                  Preparation:{recipe.preparation}
                </p>
                <p className="text-gray-500">Credit: {recipe.credit}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecipePage;
