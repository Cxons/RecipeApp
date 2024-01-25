/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function InputCode() {
  const [code, setCode] = useState();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3500/users/verifyAuth",
        { authCode: code },
        { withCredentials: true }
      )
      .then(
        (res) => console.log(res),
        navigate("/newPassword", { replace: false })
      )
      .catch((err) => console.log(err));
  }
  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col">
        {code}
        <label htmlFor="inputCode">Enter Verification code</label>
        <input
          type="text"
          id="inputCode"
          onChange={(e) => {
            e.preventDefault();
            setCode(e.target.value);
          }}
          className="h-[3rem] w-[7rem] border-[0.2rem]"
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default InputCode;
