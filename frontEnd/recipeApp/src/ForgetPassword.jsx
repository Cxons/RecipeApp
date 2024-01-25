/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import backImg from "./assets/images/picture7.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [content, setContent] = useState();
  const navigate = useNavigate();

  function handleChange(e) {
    e.preventDefault();
    setContent(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3500/users/forgetPassword",
        { email: content },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("success", res);
        if (res.status === 200) {
          navigate("/inputCode", { replace: false });
        }
      })
      .catch((err) => console.log("the error", err));
  }
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      {/* <img src={backImg} alt="" className="w-[100%] h-[100%] object-contain" /> */}
      <form onClick={handleSubmit} className="flex flex-col">
        <label htmlFor="forget">Enter email</label>
        <input
          type="text"
          id="forget"
          className="h-[2rem] w-[20rem] border-[.1rem] outline-none bg-white"
          onChange={handleChange}
        />
        <button>Get Verification Code</button>
      </form>
    </div>
  );
}

export default ForgetPassword;
