import React, { useContext, useState } from "react";
import { Flex, Heading, Button, Text, Input, Select } from "@chakra-ui/react";
import { QuestionContext } from "../context/QuestionContex";

function EditQuestion() {
  const { forEditing, handleUpdate } = useContext(QuestionContext);
  console.log(forEditing);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submited");
    await handleUpdate(
      forEditing.id,
      questions.newQuText,
      questions.newTypeOfQuestion,
      forEditing.order
    );
  };

  const [questions, setQuestions] = useState({
    newQuText: "",
    newTypeOfQuestion: "",
  });

  const handleChange = (e) => {
    console.log(questions);
    setQuestions((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <Flex
      mx="auto"
      mt="6vh"
      p={6}
      border="2px solid teal"
      w="30vw"
      h="60vh"
      direction="column"
      align="center"
      borderRadius="8px"
      boxShadow="dark-lg"
    >
      <Heading fontSize="3vh" mb="3vh">
        Edit Question
      </Heading>
      <form onSubmit={handleSubmit}>
        <Text mb="1.8vh">Question {forEditing.listNumber}</Text>

        <Text mb="1.8vh" fontWeight="bold">
          {forEditing.oldQuestion}
        </Text>
        <Text mb="3vh">type of question - {forEditing.oldType}</Text>
        <Input
          type="text"
          placeholder="enter new question"
          variant="flushed"
          mb="3vh"
          name="newQuText"
          value={questions.newQuText}
          onChange={handleChange}
        />
        <Select
          placeholder="Select question type"
          variant="flushed"
          mb="4vh"
          name="newTypeOfQuestion"
          value={questions.newTypeOfQuestion}
          onChange={handleChange}
        >
          <option defaultValue value="text">
            Text
          </option>
          <option value="long_text">Long text</option>
          <option value="image">Image</option>
        </Select>
        <Button type="submit">Edit</Button>
      </form>
    </Flex>
  );
}

export default EditQuestion;
