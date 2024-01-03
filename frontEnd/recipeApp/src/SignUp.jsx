/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3500/users/Register", posts)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
        setErr(err.response.data.message);
      });
  }

  return (
    <div className="bg-[#2A3439] min-h-[100vh] max-w-[100vw] flex justify-center items-center">
      <form
        className="flex flex-col h-[28rem] w-[25rem] bg-white rounded-[0.5rem]"
        onSubmit={handleSubmit}
      >
        <div className="my-[1rem] ml-[2.5rem] mt-[3rem] text-[1.3rem]">
          SIGN UP
        </div>
        <label className="text-left ml-[2.5rem]" htmlFor="text">
          Name
        </label>
        <input
          type="text"
          id="text"
          value={posts.name}
          name="name"
          onChange={handlePosts}
          className="border-[2px] ml-[2.5rem] h-[2.4rem] w-[20rem] rounded-[0.2rem]"
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
          className="border-[2px] ml-[2.5rem] h-[2.4rem] w-[20rem] rounded-[0.5rem] mt-[1.5rem] bg-red-400 hover:bg-red-500 text-white"
          type="submit"
        >
          SIGN UP
        </button>
      </form>
    </div>
  );
}
