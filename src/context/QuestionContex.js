import React, { createContext, useState } from "react";
import {
  getAllQuestion,
  deleteQuestions,
  updateQuestion,
  getQuestionsFromAllUsers,
} from "../services/questions";

export const QuestionContext = createContext();

export const QuestionContextProvider = ({ children }) => {
  const [order, setOrder] = useState(0);
  const [questionList, setQuestionList] = useState([]);
  const [forEditing, setForEditing] = useState({});
  const handleGetQuestions = async (id) => {
    try {
      const response = await getAllQuestion(id);
      const questions = response.data.data;
      setQuestionList((prev) => [...prev, ...questions]);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGetAllQuestions = async () => {
    try {
      const response = await getQuestionsFromAllUsers();
      if (response.data.data.length === 0) {
        setOrder(0);
        return;
      } else {
        const orders = response.data.data.map((item) => item.attributes.order);
        setOrder(Math.max(...orders));
      }
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = (id) => {
    deleteQuestions(id);
    setQuestionList((prev) => {
      return prev.filter((item) => {
        return item.id !== id;
      });
    });
  };

  const handleUpdate = async (id, text, type, order) => {
    const response = await updateQuestion(id, text, type, order);
    //here we need to upadate also a context
    setQuestionList((prev) => {
      return [...prev.filter((item) => item.id !== id), response.data.data];
    });
  };

  return (
    <QuestionContext.Provider
      value={{
        order,
        setOrder,
        questionList,
        setQuestionList,
        handleDelete,
        handleUpdate,
        forEditing,
        setForEditing,
        handleGetQuestions,
        handleGetAllQuestions,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
