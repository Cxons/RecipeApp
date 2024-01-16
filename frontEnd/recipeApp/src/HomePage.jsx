/* eslint-disable no-unused-vars */
import React from "react";
import Picture3 from "./assets/images/Picture3.jpg";
import { Link } from "react-router-dom";
import imgArr from "./assets/imageArray/imgArr";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-[500vh] max-w-[100vw]">
      <div className="h-[100vh] w-[100%] bg-white-500 text-black">
        <div className="h-[20vh] w-[100vw] flex justify-between items-center">
          <div className="ml-[6rem] text-3xl opacity-[2] text-[orange]">
            X<span className="text-[#ffa600f3]">O</span>N
            <span className="text-[orange]">S</span>
          </div>
          <div className="flex space-x-[4rem] mr-[4rem]">
            {/* <div className="hover:text-red-200">CONTACT US</div> */}
            <div className="hover:text-orange-500 mt-3 font-semibold">
              <Link to="/user/login">SIGN IN</Link>
            </div>
            <motion.div
              whileHover={{ scale: 1.06 }}
              className=" h-[3rem] w-[6rem] bg-[orange] text-white flex items-center justify-center rounded-[0.8rem]"
            >
              <Link to="/user/signup">SIGN UP</Link>
            </motion.div>
          </div>
        </div>
        <div className="h-[80vh] w-[100vw] flex flex-col justify-center justify-between">
          <div className="mt-[5rem] ml-[3rem] flex flex-col items-center">
            <div className="text-6xl font-extrabold mb-[3rem] italic font-serif">
              Welcome to Xons{" "}
              <span className="bg-clip-text bg-gradient-to-tr from-amber-300 via-orange-500 to-white text-transparent">
                Recipe
              </span>{" "}
              Hub!
            </div>
            <div className="text-2xl italic font-serif opacity-[.5] text-">
              Share and Discover Culinary Creations
            </div>
          </div>
          <div className="mt-[7rem] w-[40rem] italic tracking-wide font-serif">
            <div>For Food Enthusiasts, By Food Enthusiasts</div>
            <div>
              Are you ready to showcase your culinary masterpieces or explore a
              treasure trove of delicious recipes from around the world? Xons
              Recipe Hub is your culinary community where flavors meet
              creativity.
            </div>
            <div className="mt-[2rem]">
              Unlock a world of flavors with Xons Recipe, your go-to destination
              for delicious and diverse recipes. Whether you are a seasoned chef
              or a kitchen novice, our app is designed to inspire your culinary
              journey.
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[100vw] h-[100vh] flex flex-col justify-center">
        <div className="mb-[3rem] text-3xl italic text-[#2A3439] text-center mt-[5rem] "></div>
        <div className="w-[100vw] flex justify-between">
          <div className="bg-gray-700 ml-[2.5rem] flex flex-col items-center justify-center p-6 rounded-lg shadow-md text-gray-200 text-center transition duration-300 hover:bg-gray-800 hover:shadow-lg w-[45%] h-[15rem]">
            <div className="italic font-serif text-2xl text-gray-300 mb-[2rem]">
              Diverse Recipes
            </div>
            <div className="italic font-serif  text-gray-300">
              Dive into a world of gastronomic delights. From traditional
              classics to modern twists, there is something for every palate.
            </div>
          </div>
          <div className="bg-gray-700 mr-[2.5rem] flex flex-col items-center justify-center p-6 rounded-lg shadow-md text-gray-200 text-center transition duration-300 hover:bg-gray-800 hover:shadow-lg w-[45%] h-[15rem]">
            <div className="italic font-serif text-2xl text-gray-300 mb-[2rem]">
              User-Curated Collections
            </div>
            <div className="italic font-serif text-gray-300">
              Discover trending recipes, seasonal favorites, and kitchen hacks
              curated by fellow food lovers
            </div>
          </div>
        </div>
        <div className="mb-[3rem] text-3xl ml-[5rem] italic text-[#2A3439] text-center mr-[3rem] mt-[2.5rem]"></div>
        <div className="w-[100vw] flex justify-between">
          <div className="bg-gray-700 ml-[2.5rem] flex flex-col items-center justify-center p-6 rounded-lg shadow-md text-gray-200 text-center transition duration-300 hover:bg-gray-800 hover:shadow-lg w-[45%] h-[15rem]">
            <div className="italic font-serif text-2xl text-gray-300 mb-[2rem]">
              Upload Your Recipes
            </div>
            <div className="italic font-serif text-gray-300">
              Be a part of our community by sharing your favorite recipes.
              Capture your essence of your dish with vibrant images and detailed
              instructions.
            </div>
          </div>
          <div className="bg-gray-700 mr-[2.5rem] flex flex-col items-center justify-center p-6 rounded-lg shadow-md text-gray-200 text-center transition duration-300 hover:bg-gray-800 hover:shadow-lg w-[45%] h-[15rem]">
            <div className="italic font-serif text-2xl text-gray-300 mb-[2rem]">
              Connect with Foodies
            </div>
            <div className="italic font-serif text-gray-300">
              Engage with a passionate community of food enthusiasts. Share
              tips, ask questions, and celebrate the joy of cooking together.
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[8rem] h-[100vh] w-[100vw] bg-red-200 flex items-center justify-center">
        <div
          className="border-[2px] ml-[2.5rem] h-[2.4rem] w-[20rem] rounded-[0.5rem] mt-[1.5rem] bg-red-400 hover:bg-red-500 text-white"
          data-onsuccess="onSignIn"
        >
          SIGN IN WITH GOOGLE
        </div>
      </div>
    </div>
  );
}
