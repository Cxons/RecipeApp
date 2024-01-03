/* eslint-disable no-unused-vars */
import React, { createRef, useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3500";
axios.defaults.headers.common["Content-Type"] = "application/json";

const readBase64 = (file) => {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (err) => {
      reject(err);
    };
  });
};
export default function RecipePageUpload() {
  const [inputFile, setInputFile] = useState();
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    preparation: "",
    credit: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      title: formData.title,
      imgUrl: inputFile,
      ingredients: formData.ingredients,
      preparation: formData.preparation,
      credit: formData.credit,
    };
    console.log(body);
    axios
      .post("http://localhost:3500/recipe/upload", body)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFile = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const base = await readBase64(file);
    setInputFile(base);
  };
  const handleChange = async (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-[100vh] max-w-[100vw] bg-[#2A3439]">
      <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="text-sm font-semibold" htmlFor="title">
            Title or Name of the Recipe
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            // required
            className="w-full p-2 border rounded-md focus:outline-none focus:border-green-500"
          />

          <label className="text-sm font-semibold" htmlFor="ingredients">
            Ingredients Required
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            onChange={handleChange}
            required
            value={formData.ingredients}
            className="w-full p-2 h-[8rem] border rounded-md focus:outline-none focus:border-green-500"
          ></textarea>

          <label className="text-sm font-semibold" htmlFor="preparation">
            Preparation
          </label>
          <textarea
            id="preparation"
            name="preparation"
            onChange={handleChange}
            required
            value={formData.preparation}
            className="w-full p-2 h-[8rem] border rounded-md resize-y focus:outline-none focus:border-green-500"
          ></textarea>

          <label className="text-sm font-semibold" htmlFor="file">
            Image or Video
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*, video/*"
            onChange={handleFile}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:border-green-500"
          />

          <label className="text-sm font-semibold" htmlFor="credit">
            Credit/Your Brand Name
          </label>
          <input
            type="text"
            id="credit"
            name="credit"
            onChange={handleChange}
            value={formData.credit}
            className="w-full p-2 border rounded-md focus:outline-none focus:border-green-500"
          />

          <button
            type="submit"
            className="bg-[#2A3439] text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
}
