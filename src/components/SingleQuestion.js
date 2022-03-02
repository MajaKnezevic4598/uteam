import React, { useContext } from "react";
import { Flex, Box, Text, Button, Spacer } from "@chakra-ui/react";
import { QuestionContext } from "../context/QuestionContex";
import { Link } from "react-router-dom";

function SingleQuestion() {
  const { questionList, handleDelete, setForEditing } =
    useContext(QuestionContext);
  console.log("iz singleQuestiona item");
  console.log(questionList);

  const styleText = (str) => {
    switch (str) {
      case "long_text":
        return "Long text";
      case "text":
        return "Text";
      case "image":
        return "Image";
      default:
        return "";
    }
  };
  return (
    <Flex
      w="60vw"
      h="auto"
      p={6}
      border="1px solid gray"
      borderRadius="8px"
      mt="4vh"
    >
      {questionList.length !== 0 && (
        <Box>
          {" "}
          {questionList.map((item, index) => {
            console.log(item);
            return (
              <Flex
                key={index}
                mb="3.5vh"
                w="55vw"
                align="center"
                borderBottom="1px solid gray"
              >
                <Box>
                  <Flex fontSize="1.8vh" mb="1.8vh">
                    <Text mr="2vw">Question {index + 1} </Text>
                    <Text>{styleText(item.attributes.type)}</Text>
                  </Flex>
                  <Text fontWeight="700">{item.attributes.text}</Text>
                </Box>
                <Spacer />
                <Box>
                  <Link to="edit-question">
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setForEditing({
                          id: item.id,
                          order: item.attributes.order,
                          listNumber: index + 1,
                          oldQuestion: item.attributes.text,
                          oldType: item.attributes.type,
                        });
                      }}
                    >
                      Edit
                    </Button>
                  </Link>
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
