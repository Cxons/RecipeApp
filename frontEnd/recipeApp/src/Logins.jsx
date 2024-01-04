/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle } from "./firebase";

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
    <div className="bg-[#2A3439] min-h-[100vh] max-w-[100vw] flex justify-center items-center">
      <form
        className="flex flex-col h-[29rem] w-[25rem] bg-white rounded-[0.5rem]"
        onSubmit={handleSubmit}
      >
        <div className="my-[1rem] ml-[2.5rem] mt-[3rem] text-[1.3rem]">
          SIGN IN
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
          className="border-[2px] ml-[2.5rem] h-[2.4rem] w-[20rem] rounded-[0.2rem]"
        />
        <label className="text-left ml-[2.5rem] mt-[1.5rem]" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={posts.password}
          onChange={handlePosts}
          name="password"
          className="border-[2px] ml-[2.5rem] h-[2.4rem] w-[20rem] rounded-[0.2rem]"
        />
        {err && (
          <div className="ml-[2.5rem] mt-[0.7rem] text-[.8rem] text-red-700">
            !!{err}
          </div>
        )}
        <button
          className="border-[2px] ml-[2.5rem] h-[2.4rem] w-[20rem] rounded-[0.5rem] mt-[2.5rem] bg-red-400 hover:bg-red-500 text-white"
          type="submit"
        >
          SIGN IN
        </button>
        <button
          className="border-[2px] ml-[2.5rem] h-[2.4rem] w-[20rem] rounded-[0.5rem] mt-[2.34rem] bg-red-400 hover:bg-red-500 text-white"
          type="submit"
          onClick={googleSignIn}
        >
          SIGN IN WITH GOOGLE
        </button>
      </form>
    </div>
  );
}
