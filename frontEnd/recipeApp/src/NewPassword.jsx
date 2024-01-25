/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

function NewPassword() {
  const [newPassword, setNewPassword] = useState();
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3500/users/changePassword",
        { newPassword: newPassword },
        { withCredentials: true }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col">
        {newPassword}
        <label htmlFor="inputPassword">Enter New Password</label>
        <input
          type="text"
          id="inputPassword"
          onChange={(e) => {
            e.preventDefault();
            setNewPassword(e.target.value);
          }}
          className="h-[3rem] w-[7rem] border-[0.2rem]"
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default NewPassword;
