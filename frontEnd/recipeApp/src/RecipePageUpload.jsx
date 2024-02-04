/* eslint-disable no-unused-vars */
import React, { createRef, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Modal from "./Modal";
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
  const [count, setCount] = useState(0);
  const [inputFile, setInputFile] = useState();
  const [upload, setUpload] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    preparation: "",
    credit: "",
    country: "",
  });
  const close = () => {
    setUpload(false);
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      title: formData.title,
      imgUrl: inputFile,
      ingredients: formData.ingredients,
      preparation: formData.preparation,
      credit: formData.credit,
      country: formData.country,
    };
    console.log(body);
    axios
      .post("http://localhost:3500/recipe/upload", body)
      .then(
        (res) => setUpload((prev) => !prev),
        console.log(count),
        count.current === 2 ? navigate("/recipePage", { replace: false }) : 0
      )
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
    <div className="min-h-[100vh] max-w-[100vw] bg-white flex">
      <div className="bg-orange-500 w-1/4 h-[150vh]"></div>
      <form
        className="space-y-10 relative w-3/4 ml-[5rem] p-4"
        onSubmit={handleSubmit}
      >
        <div className="text-[2rem] mb-[3rem] font-serif">SUBMIT RECIPE</div>
        <div className="flex space-x-[.01rem]">
          <label
            className="w-[8rem] font-medium font-serif text-[1.2rem]"
            htmlFor="title"
          >
            Recipe Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter recipe title"
            // required
            className="w-[40rem] h-[2.3rem] text-center shadow-sm p-2 border rounded-md focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="flex space-x-[1rem] items-center">
          <label
            className=" w-[8rem] font-medium text-[1.2rem] font-serif"
            htmlFor="ingredients"
          >
            Ingredients
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            onChange={handleChange}
            required
            value={formData.ingredients}
            className="w-full p-2 h-[8rem] shadow-sm border rounded-md focus:outline-none focus:border-green-500"
          ></textarea>
        </div>
        <div className="flex space-x-[1rem] items-center">
          <label
            className="text-[1.2rem] font-medium font-serif"
            htmlFor="preparation"
          >
            Preparation
          </label>
          <textarea
            id="preparation"
            name="preparation"
            onChange={handleChange}
            required
            value={formData.preparation}
            className="w-full p-2 h-[8rem] shadow-sm border rounded-md resize-y focus:outline-none focus:border-green-500"
          ></textarea>
        </div>
        <div className="flex space-x-[-1rem]">
          <label
            className=" w-[10rem] text-[1rem] font-medium font-serif"
            htmlFor="file"
          >
            Image (png file only)
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*, video/*"
            onChange={handleFile}
            required
            className="w-full p-2 border shadow-sm rounded-md focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="flex space-x-[-1rem]">
          <label
            className=" w-[10rem] text-[1rem]  font-medium font-serif"
            htmlFor="credit"
          >
            Country
          </label>
          <input
            type="text"
            id="credit"
            name="country"
            placeholder="Enter Country of dish"
            onChange={handleChange}
            value={formData.country}
            className="w-full p-2 border rounded-md shadow-sm text-center focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="flex space-x-[-1rem]">
          <label
            className="w-[10rem] text-[1rem] font-medium font-serif"
            htmlFor="credit"
          >
            Credit
          </label>
          <input
            type="text"
            id="credit"
            name="credit"
            placeholder="Brand Name"
            onChange={handleChange}
            value={formData.credit}
            className="w-full p-2 border shadow-sm rounded-md text-center focus:outline-none focus:border-green-500"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.7 }}
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-400 focus:outline-none focus:ring focus:border-green-300"
        >
          Submit Recipe
        </motion.button>
      </form>
      {upload && (
        <Modal handleClose={close}>
          <div>Successfully Uploaded</div>
        </Modal>
      )}
    </div>
  );
}
