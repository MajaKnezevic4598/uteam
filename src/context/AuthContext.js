import React, { useState, createContext, useEffect, useContext } from "react";
import { registerUser } from "../services/registerUser";
import { uploadFile } from "../services/uploadFile";
import { company } from "../services/company";
import { createProfile } from "../services/createProfile";
import { UserContext } from "../context/UserContex";
import { user, getUser } from "../services/user";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwt, setJwt] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const { setCurrentUser } = useContext(UserContext);

  const logOut = () => {
    setIsLoggedIn(false);
    console.log("You are logged out!!!!");
    setCurrentUser({ name: "", profilePhoto: "", email: "" });
    window.localStorage.clear();
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
      setAuthUser("registrovan");

      const responseFromCreateProfile = await createProfile(
        registerRes.data.user.id,
        companyRes.data.data.id,
        photoRes.data[0].id,
        registerRes.data.user.username
      );
      console.log(responseFromCreateProfile);
      const responseUser = await user();
      const responseFromGetUser = await getUser(responseUser.data.id);
      console.log(responseFromGetUser);
      console.log("***************************************************");
      setCurrentUser({
        name: responseFromGetUser.data.data[0].attributes.name,
        profilePhoto:
          responseFromGetUser.data.data[0].attributes.profilePhoto.data
            .attributes.url,
        email: responseUser.data.email,
      });
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  useEffect(
    () => {
      console.log(jwt);
      if (jwt !== null) {
        console.log("sada sam razlicit on null");
        window.localStorage.setItem("jwt", jwt);
      }
    },
    [jwt],
    []
  );

  useEffect(
    () => {
      console.log(authUser);
      if (authUser !== null) {
        console.log("sada sam razlicit on null");
        window.localStorage.setItem("auth", authUser);
      }
    },
    [authUser],
    []
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        logOut,
        setJwt,
        jwt,
        handleUserRegister,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
