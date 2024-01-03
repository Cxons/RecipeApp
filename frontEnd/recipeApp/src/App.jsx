/* eslint-disable no-unused-vars */
import React from "react";
import Logins from "./SignUp";
import Login from "./Logins";
import HomePage from "./HomePage";
import { Routes, Route } from "react-router-dom";
import RecipePage from "./RecipePage";
import RecipePageUpload from "./RecipePageUpload";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user/signup" element={<Logins />} />
      <Route path="/user/login" element={<Login />} />
      <Route path="/recipePage" element={<RecipePage />} />
      <Route path="/recipePage/upload" element={<RecipePageUpload />} />
    </Routes>
  );
}
