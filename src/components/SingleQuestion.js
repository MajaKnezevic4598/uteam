import React, { useContext } from "react";
import { Flex, Box, Text, Button, Spacer } from "@chakra-ui/react";
import { QuestionContext } from "../context/QuestionContex";

function SingleQuestion() {
  const { questionList, handleDelete } = useContext(QuestionContext);
  console.log("iz singleQuestiona item");
  console.log(questionList);
  return (
    <Flex w="60vw" h="auto" p={6} border="1px solid gray">
      {questionList.length !== 0 && (
        <Box border="1px solid blue">
          {" "}
          {questionList.map((item, index) => {
            return (
              <Flex
                border="1px solid red"
                key={index}
                mb="2vh"
                w="55vw"
                align="center"
              >
                <Box>
                  <Flex fontSize="1.8vh" mb="1.8vh">
                    <Text mr="2vw">Question 1 </Text>
                    <Text>Text</Text>
                  </Flex>
                  <Text fontWeight="700">{item.attributes.text}</Text>
                </Box>
                <Spacer />
                <Box>
                  <Button colorScheme="teal" variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    ml="2vw"
                    size="sm"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Flex>
            );
          })}
        </Box>
      )}
    </Flex>
  );
}

export default SingleQuestion;
