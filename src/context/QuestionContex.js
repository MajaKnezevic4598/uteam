import React, { createContext, useState, useEffect } from "react";
import { getAllQuestion } from "../services/questions";

export const QuestionContext = createContext();

export const QuestionContextProvider = ({ children }) => {
  const [order, setOrder] = useState(0);

  useEffect(() => {
    const getQ = async () => {
      try {
        const response = await getAllQuestion();
        console.log(response);
        if (response.data.data.length === 0) {
          console.log("nema podataka u nizu");
          return;
        } else {
          const orders = response.data.data.map(
            (item) => item.attributes.order
          );
          setOrder(Math.max(...orders));
        }
        return response;
      } catch (error) {
        console.log(error.message);
      }
    };
    getQ();
  }, []);

  return (
    <QuestionContext.Provider value={{ order, setOrder }}>
      {children}
    </QuestionContext.Provider>
  );
};
