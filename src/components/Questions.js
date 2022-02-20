import React, { useContext } from "react";
import { Flex, Text, Button, Spacer, Box } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { QuestionContext } from "../context/QuestionContex";
import SingleQuestion from "./SingleQuestion";

function Questions() {
  const { questionList } = useContext(QuestionContext);
  return (
    <Flex
      border="1px solid black"
      p={6}
      width="full"
      direction="column"
      align="center"
    >
      <Flex align="center" h="10vh" width="60vw">
        <Text ml="2vw" fontWeight="bold" fontSize="3vh">
          Questions
        </Text>
        <Spacer />
        <Link to="add-questions">
          <Button
            leftIcon={<AddIcon></AddIcon>}
            colorScheme="teal"
            mr="2vw"
            variant="solid"
          >
            Add new question
          </Button>
        </Link>
      </Flex>
      <Box>
        {questionList.length ? (
          <SingleQuestion>ima pitanja</SingleQuestion>
        ) : (
          <Box mt="4vh" fontWeight="bold" fontSize="xl">
            Define questions
          </Box>
        )}
        {/* make an component and pass questionList as props */}
      </Box>
    </Flex>
  );
}

export default Questions;
