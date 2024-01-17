/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import googleImg from "../src/assets/images/google.png";
import loginImg from "./assets/images/image19.jpg";
import { motion } from "framer-motion";
import { signInWithGoogle } from "./firebase";

export default function Logins() {
  const [posts, setPosts] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  function handlePosts(e) {
    e.preventDefault();
    setPosts({
      ...posts,
      [e.target.name]: e.target.value,
    });
  }
  function googleSignIn() {
    signInWithGoogle(navigate);
  }
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3500/users/Register", posts)
      .then((res) => {
        if (res) {
          console.log(res.data), navigate("/user/login", { replace: false });
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
          className="flex flex-col h-[100%] w-[80%] bg-white ml-[5rem] mt-[0rem] rounded-[0.5rem]"
          onSubmit={handleSubmit}
        >
          <div className="my-[1rem] ml-[2.5rem] mt-[3rem] text-[2rem] italic font-serif bg-clip-text bg-gradient-to-tr from-amber-300 via-orange-500 to-white text-transparent font-bold">
            XONS
          </div>
          <label className="text-left ml-[2.5rem] mt-[1rem]" htmlFor="text">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="text"
            value={posts.name}
            onChange={handlePosts}
            className="border-b border-gray-500 py-2 px-3 text-black-500 leading-tight focus:outline-none focus:border-yellow-900 w-[20rem] ml-[2.5rem]"
          />
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
            className="border-b border-gray-500 py-2 px-3 text-black-500 leading-tight focus:outline-none focus:border-yellow-900 w-[20rem] ml-[2.5rem]"
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
            SIGN UP
          </motion.button>
          <div className="border-b mt-[3rem] ml-[6rem] border-gray-500 py-2 px-3 text-black-500 leading-tight w-[10rem]"></div>

          <div className="flex mt-[1rem] ml-[6rem] space-x-2">
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
