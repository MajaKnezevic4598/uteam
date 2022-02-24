import React, { useState, createContext, useEffect, useContext } from "react";
import { registerUser } from "../services/registerUser";
import { uploadFile } from "../services/uploadFile";
import { company } from "../services/company";
import { createProfile } from "../services/Profile";
import { UserContext } from "../context/UserContex";
import { user, getUser } from "../services/user";
import { authUser } from "../services/authUser";
import { passwordChange } from "../services/password";
import { QuestionContext } from "../context/QuestionContex";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwt, setJwt] = useState(null);
  const [authU, setAuthUser] = useState(null);
  const { setCurrentUser } = useContext(UserContext);
  const { setQuestionList } = useContext(QuestionContext);

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
    setQuestionList([]);
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
      setJwt(registerRes.data.jwt);
      setAuthUser("registrovan");

      const responseFromCreateProfile = await createProfile(
        registerRes.data.user.id,
        companyRes.data.data.id,
        photoRes.data[0].id,
        registerRes.data.user.username
      );

      const responseUser = await user();

      const responseFromGetUser = await getUser(responseUser.data.id);

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
      if (authenticatedUser.status === 200) {
        console.log("dobar password ");
        await passwordChange(authenticatedUser.data.user.id, newPassword);
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
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(
    () => {
      console.log(jwt);
      if (jwt !== null) {
        window.localStorage.setItem("jwt", jwt);
      }
    },
    [jwt],
    []
  );

  useEffect(
    () => {
      if (authU !== null) {
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
