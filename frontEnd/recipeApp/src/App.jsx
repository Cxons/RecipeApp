/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import Logins from "./SignUp";
import Login from "./Logins";
import HomePage from "./HomePage";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import RecipePage from "./RecipePage";
import RecipePageUpload from "./RecipePageUpload";
import { UseAuthContext } from "./UseAnotherAuthContext";
import ForgetPassword from "./ForgetPassword";
import InputCode from "./InputCode";
import NewPassword from "./NewPassword";

export default function App() {
  const authContext = useContext(UseAuthContext);
  const navigate = useNavigate();
  console.log("this is my context", authContext.loggedIn);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/signup" element={<Logins />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/resetPassword" element={<ForgetPassword />} />
        <Route path="/inputCode" element={<InputCode />} />
        <Route path="/newPassword" element={<NewPassword />} />
        <Route
          path="/recipePage"
          element={authContext.loggedIn ? <RecipePage /> : "loading"}
        />
        <Route
          path="/recipePage/upload"
          element={authContext.loggedIn ? <RecipePageUpload /> : "loading"}
        />
      </Routes>
    </>
  );
}
