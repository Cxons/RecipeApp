/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UseAuthContext = createContext();
function UseAnotherAuthContext({ children }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState({
    loading: true,
    loggedIn: false,
  });
  useEffect(() => {
    axios
      .get("http://localhost:3500/users/current", { withCredentials: true })
      .then((res) => {
        console.log("this is my response", res);
        if (res.status === 200) {
          setIsLoggedIn({
            loading: false,
            loggedIn: true,
          });
        }
      })
      .catch((err) => {
        console.log("my error", err);
      });
  }, []);
  return (
    <UseAuthContext.Provider value={isLoggedIn}>
      {children}
    </UseAuthContext.Provider>
  );
}

export default UseAnotherAuthContext;
