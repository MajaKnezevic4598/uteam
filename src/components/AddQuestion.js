import React, { useState, useContext } from "react";
import { QuestionContext } from "../context/QuestionContex";
import {
  Box,
  Heading,
  Input,
  Select,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";

import { postQuestion } from "../services/questions";

function AddQuestion() {
  const [question, setQuestion] = useState({
    quText: "",
    typeOfQuestion: "",
  });
  const { order, setOrder, setQuestionList } = useContext(QuestionContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submited");
    console.log(question);
    const { quText, typeOfQuestion } = question;
    const response = await postQuestion(quText, typeOfQuestion, order + 1);
    setOrder(order + 1);
    setQuestion({ quText: "", typeOfQuestion: "" });
    if (response.status === 200) setQuestionList((prev) => [...prev, quText]);
  };

  const handleChange = (e) => {
    setQuestion((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <Box
      mx="auto"
      mt="6vh"
      border="2px solid teal"
      p={8}
      width="35vw"
      h="60vh"
      borderRadius="8px"
      boxShadow="dark-lg"
    >
      <Heading fontSize="3vh" mb="6vh">
        Add new question
        {order}
      </Heading>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Question text"
          variant="flushed"
          name="quText"
          value={question.quText}
          onChange={handleChange}
        />
        <Text mt="6vh" mb="2vh">
          Question type
        </Text>

        <Select
          placeholder="Select question type"
          variant="flushed"
          name="typeOfQuestion"
          value={question.typeOfQuestion}
          onChange={handleChange}
        >
          <option defaultValue value="text">
            Text
          </option>
          <option value="long_text">Long text</option>
          <option value="image">Image</option>
        </Select>
        <Flex justifyContent="flex-end" mt="8vh">
          <Button type="submit">Save</Button>
        </Flex>
      </form>
    </Box>
  );
}

export default AddQuestion;
