/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function NewPassword() {
  const schema = z
    .object({
      password: z.string().min(5).max(30),
      confirmPassword: z.string().min(5).max(30),
    })
    .refine(
      (data) => data.password === data.confirmPassword,
      { message: "Passwords do not match" },
      { path: ["confirmPassword"] }
    );
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  function controlSubmit(e) {
    e.preventDefault;
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
      <form onSubmit={handleSubmit(controlSubmit)} className="flex flex-col">
        {newPassword.confirmPassword}
        <label htmlFor="inputPassword">Enter New Password</label>
        <input
          {...register("password")}
          type="text"
          id="inputPassword"
          onChange={(e) => {
            e.preventDefault();
            setNewPassword({ password: e.target.value });
          }}
          className="h-[3rem] w-[7rem] border-[0.2rem]"
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          {...register("confirmPassword")}
          type="text"
          id="confirmPassword"
          onChange={(e) => {
            e.preventDefault();
            setNewPassword({ confirmPassword: e.target.value });
          }}
          className="h-[3rem] w-[7rem] border-[0.2rem]"
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default NewPassword;
