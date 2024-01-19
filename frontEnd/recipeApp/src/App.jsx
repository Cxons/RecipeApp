/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import Logins from "./SignUp";
import Login from "./Logins";
import HomePage from "./HomePage";
import { Routes, Route, Navigate, redirect } from "react-router-dom";
import RecipePage from "./RecipePage";
import RecipePageUpload from "./RecipePageUpload";
import { UseAuthContext } from "./UseAnotherAuthContext";

export default function App() {
  const authContext = useContext(UseAuthContext);
  console.log(authContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/signup" element={<Logins />} />
        <Route path="/user/login" element={<Login />} />
        <Route
          path="/recipePage"
          element={
            authContext.loggedIn ? (
              <RecipePage />
            ) : (
              <Navigate to="/user/login" />
            )
          }
        />
        <Route
          path="/recipePage/upload"
          element={
            authContext.loggedIn ? (
              <RecipePageUpload />
            ) : (
              <Navigate to="/user/login" />
            )
          }
        />
      </Routes>
    </>
  );
}
