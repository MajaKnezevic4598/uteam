import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState({
  //   name: "",
  //   profilePhoto: "",
  // });

  const [currentUser, setCurrentUser] = useState(() => {
    if (window.localStorage.getItem("User"))
      return JSON.parse(window.localStorage.getItem("User"));
    return { name: "", profilePhoto: "", email: "", userId: "", profileId: "" };
  });
  useEffect(
    () => {
      if (currentUser !== null) {
        window.localStorage.setItem("User", JSON.stringify(currentUser));
      }
    },
    [currentUser],
    []
  );
  return (
    <UserContext.Provider value={{ setCurrentUser, currentUser }}>
      {children}
    </UserContext.Provider>
  );
};
