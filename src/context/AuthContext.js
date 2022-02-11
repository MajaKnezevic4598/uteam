import React, { useState, createContext, useEffect } from "react";
import { registerUser } from "../services/registerUser";
import { uploadFile } from "../services/uploadFile";
import { company } from "../services/company";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwt, setJwt] = useState(null);

  const logOut = () => {
    setIsLoggedIn(false);
    console.log("You are logged out!!!!");
    window.localStorage.removeItem("jwt");
  };

  //we need to put handleRegister to context and move it from Register.js component
  const handleUserRegister = async (formData, data) => {
    try {
      const [registerRes, companyRes, photoRes] = await Promise.all([
        registerUser(data),
        company(data.company),
        uploadFile(formData),
      ]);
      console.log("response from registerUser", registerRes);
      console.log("response from companyRes", companyRes);
      console.log("response from photoRes", photoRes);
      setJwt(registerRes.data.jwt);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  useEffect(() => {
    console.log(jwt);
    if (jwt !== null) {
      console.log("sada sam razlicit on null");
      window.localStorage.setItem("jwt", jwt);
    }
  }, [jwt]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        logOut,
        setJwt,
        jwt,
        handleUserRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
