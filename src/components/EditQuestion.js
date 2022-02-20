import React from "react";
import { Flex, Heading, Button, Text, Input } from "@chakra-ui/react";

function EditQuestion() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submited");
  };
  return (
    <Flex
      mx="auto"
      mt="6vh"
      p={6}
      border="2px solid teal"
      w="30vw"
      h="50vh"
      direction="column"
      align="center"
      borderRadius="8px"
      boxShadow="dark-lg"
    >
      <Heading fontSize="3vh" mb="3vh">
        Edit Question
      </Heading>
      <form onSubmit={handleSubmit}>
        <Text mb="1.8vh">Question 1</Text>

        <Text mb="1.8vh">Old Question</Text>
        <Text mb="3vh">type of question - Text</Text>
        <Input
          type="text"
          placeholder="enter new question"
          variant="flushed"
          mb="3vh"
        />
        <Button type="submit">Edit</Button>
      </form>
    </Flex>
  );
}

export default EditQuestion;
