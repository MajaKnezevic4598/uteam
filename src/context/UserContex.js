import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    profilePhoto: "",
  });
  return (
    <UserContext.Provider value={{ setCurrentUser, currentUser }}>
      {children}
    </UserContext.Provider>
  );
};
