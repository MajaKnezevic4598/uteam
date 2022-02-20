import React, { createContext, useState, useEffect } from "react";
import { getAllQuestion, deleteQuestions } from "../services/questions";

export const QuestionContext = createContext();

export const QuestionContextProvider = ({ children }) => {
  const [order, setOrder] = useState(0);
  const [questionList, setQuestionList] = useState([]);

  useEffect(
    () => {
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
            const questions = response.data.data;
            console.log(questions);
            setOrder(Math.max(...orders));
            setQuestionList((prev) => [...prev, ...questions]);
            //here in the first render we set contex to contain questions from strapi
          }
          return response;
        } catch (error) {
          console.log(error.message);
        }
      };
      getQ();
    },
    [],
    [questionList]
  );

  const handleDelete = (id) => {
    deleteQuestions(id);
    setQuestionList((prev) => {
      return prev.filter((item) => {
        return item.id !== id;
      });
    });
  };

  return (
    <QuestionContext.Provider
      value={{ order, setOrder, questionList, setQuestionList, handleDelete }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
