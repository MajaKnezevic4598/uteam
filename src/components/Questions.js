import React from "react";
import { Flex, Text, Button, Spacer, Box } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function Questions() {
  return (
    <Flex border="1px solid black" p={6} width="full" direction="column">
      <Flex align="center" border="1px solid blue" h="10vh" width="60vw">
        <Text ml="2vw">Questions</Text>
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
      <Box>Here we need to show questions that are alredy defined</Box>
    </Flex>
  );
}

export default Questions;
