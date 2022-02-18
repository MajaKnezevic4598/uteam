import React, { createContext, useState, useEffect } from "react";

export const QuestionContext = createContext();

export const QuestionContextProvider = ({ children }) => {
  //here we need to generate order
  //we can save order in local storage
  //if there is not key with order we can set order to be 1
  //if there is a key with a value of order we can set order to be value+1
  //   const [order, setOrder] = useState(() => {
  //     const localOrder = window.localStorage.getItem("order");
  //     if (order) return Number(localOrder) + 1;
  //     return 0;
  //   });

  const [order, setOrder] = useState(window.localStorage.getItem("order"));

  useEffect(() => {
    window.localStorage.setItem("order", order);
  }, [order]);
  return (
    <QuestionContext.Provider value={{ order, setOrder }}>
      {children}
    </QuestionContext.Provider>
  );
};
