import React, { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwt, setJwt] = useState(null);

  const logOut = () => {
    setIsLoggedIn(false);
    console.log("You are logged out!!!!");
    window.localStorage.removeItem("jwt");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
