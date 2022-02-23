import React, { createContext, useState, useEffect, useContext } from "react";
import {
  getAllQuestion,
  deleteQuestions,
  updateQuestion,
} from "../services/questions";
import { UserContext } from "../context/UserContex";

export const QuestionContext = createContext();

export const QuestionContextProvider = ({ children }) => {
  const [order, setOrder] = useState(0);
  const [questionList, setQuestionList] = useState([]);
  const [forEditing, setForEditing] = useState({});
  //here we can save data about question information about editing
  const { currentUser } = useContext(UserContext);

  useEffect(
    () => {
      const getQ = async () => {
        try {
          const response = await getAllQuestion(currentUser.companyId);
          if (response.data.data.length === 0) {
            console.log("nema podataka u nizu");
            return;
          } else {
            const orders = response.data.data.map(
              (item) => item.attributes.order
            );
            const questions = response.data.data;
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

  useEffect(() => {
    console.log("question object for edditing");
    console.log(forEditing);
  }, [forEditing]);

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
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
