/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle } from "./firebase";
import loginImg from "../src/assets/images/image14.jpg";
import { motion } from "framer-motion";
import googleImg from "../src/assets/images/google.png";

export default function Login() {
  const [posts, setPosts] = useState({
    email: "",
    password: "",
  });
  const [clickState, handleClickState] = useState(!false);
  const [res, setRes] = useState(false);
  const [err, setErr] = useState("");
  function handlePosts(e) {
    e.preventDefault();
    setPosts({
      ...posts,
      [e.target.name]: e.target.value,
    });
  }
  const navigate = useNavigate();

  function googleSignIn() {
    signInWithGoogle(navigate);
  }
  function handleSubmit(e) {
    e.preventDefault();
    handleClickState((prev) => !prev);
    axios
      .post("http://localhost:3500/users/login", posts)
      .then((res) => {
        if (res) {
          console.log("about to work", res.status);
          navigate("/recipePage", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data.message);
      });
  }

  return (
    <div className="bg-white min-h-[100vh] max-w-[100vw] flex">
      <div className="basis-[50%] h-[100vh] overflow-hidden">
        <img className="w-full h-full" src={loginImg} />
      </div>
      <div className="basis-[50%] flex items-center w-[50vw] flex-col">
        <form
          className="flex flex-col h-[100%] w-[80%] bg-white ml-[5rem] mt-[2rem] rounded-[0.5rem]"
          onSubmit={handleSubmit}
        >
          <div className="my-[1rem] ml-[2.5rem] mt-[3rem] text-[2rem] italic font-serif bg-clip-text bg-gradient-to-tr from-amber-300 via-orange-500 to-white text-transparent font-bold">
            XONS
          </div>
          <label className="text-left ml-[2.5rem] mt-[1rem]" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={posts.email}
            onChange={handlePosts}
            className="border-b border-gray-500 py-2 px-3 text-black-500 leading-tight focus:outline-none focus:border-yellow-900 w-[20rem] ml-[2.5rem]"
          />
          <label
            className="text-left ml-[2.5rem] mt-[1.5rem]"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={posts.password}
            onChange={handlePosts}
            name="password"
            className="border-b border-gray-500 py-2 px-3 text-yellow-300 leading-tight focus:outline-none focus:border-yellow-900 w-[20rem] ml-[2.5rem]"
          />
          {err && (
            <div className="ml-[2.5rem] mt-[0.7rem] text-[.8rem] text-red-700">
              !!{err}
            </div>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="border-[2px] ml-[6rem] h-[2.4rem] w-[10rem] rounded-[1rem] mt-[2.5rem]  bg-orange-500 opacity-[.9] font-semibold text-white"
            type="submit"
          >
            SIGN IN
          </motion.button>
          <div className="border-b mt-[3rem] ml-[6rem] border-gray-500 py-2 px-3 text-black-500 leading-tight w-[10rem]"></div>

          <div className="flex mt-[2rem] ml-[6rem] space-x-2">
            <div className="h-[1.2rem] w-[1.2rem] mt-[5px]">
              <img src={googleImg} alt="" />
            </div>
            <button className="text-black" type="submit" onClick={googleSignIn}>
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
