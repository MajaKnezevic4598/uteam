import React, { useContext } from "react";
import { Flex } from "@chakra-ui/react";
import { QuestionContext } from "../context/QuestionContex";

function SingleQuestion() {
  const { questionList } = useContext(QuestionContext);
  console.log("iz singleQuestiona item");
  console.log(questionList);
  return (
    <Flex w="50vw" h="15vh" p={6} border="1px solid gray">
      {questionList && <div> {questionList}</div>}
    </Flex>
  );
}

export default SingleQuestion;
