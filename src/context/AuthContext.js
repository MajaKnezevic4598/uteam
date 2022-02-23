import React, { useState, createContext, useEffect, useContext } from "react";
import { registerUser } from "../services/registerUser";
import { uploadFile } from "../services/uploadFile";
import { company } from "../services/company";
import { createProfile } from "../services/Profile";
import { UserContext } from "../context/UserContex";
import { user, getUser } from "../services/user";
import { authUser } from "../services/authUser";
import { passwordChange } from "../services/password";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwt, setJwt] = useState(null);
  const [authU, setAuthUser] = useState(null);
  const { setCurrentUser } = useContext(UserContext);

  const logOut = () => {
    setIsLoggedIn(false);
    console.log("You are logged out!!!!");
    setCurrentUser({
      name: "",
      profilePhoto: "",
      email: "",
      userId: "",
      profileId: "",
      companyId: "",
    });
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
      console.log(responseUser);
      console.log(
        "**************responseuser***********************************************"
      );
      const responseFromGetUser = await getUser(responseUser.data.id);
      console.log(responseFromGetUser);
      console.log("***************************************************");
      await setCurrentUser({
        name: responseFromGetUser.data.data[0].attributes.name,
        profilePhoto:
          responseFromGetUser.data.data[0].attributes.profilePhoto.data
            .attributes.url,
        email: responseUser.data.email,
        userId: responseUser.data.id,
        profileId: responseFromCreateProfile.data.data.id,
        companyId: companyRes.data.data.id,
      });
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const handlePasswordChange = async (email, oldPassword, newPassword) => {
    try {
      let authenticatedUser = await authUser(email, oldPassword);
      console.log("odgovor iz autentifikacije************************");
      console.log(authenticatedUser);
      if (authenticatedUser.status === 200) {
        console.log("dobar password ");
        const res = await passwordChange(
          authenticatedUser.data.user.id,
          newPassword
        );
        console.log(res);
        authenticatedUser = await authUser(email, newPassword);
        setJwt(authenticatedUser.data.jwt);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const imageChange = async (data) => {
    try {
      const response = await uploadFile(data);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.message);
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
      console.log(authU);
      if (authU !== null) {
        console.log("sada sam razlicit on null");
        window.localStorage.setItem("auth", authU);
      }
    },
    [authU],
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
        handlePasswordChange,
        imageChange,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
