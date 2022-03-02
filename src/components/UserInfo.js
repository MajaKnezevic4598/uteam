import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContex";
import { Image, Flex, Text, Box } from "@chakra-ui/react";

function UserInfo() {
  const { currentUser } = useContext(UserContext);

  // useEffect(() => {
  //   console.log(currentUser);
  // });

  return (
    <Box
      py={currentUser.name ? "1vh" : "0"}
      bgGradient="linear(to-r,gray.500, white)"
    >
      {currentUser.name && (
        <Flex justify="flex-end" align="center">
          {" "}
          <Text fontSize="3vh" fontWeight="bold" letterSpacing="0.1vw">
            {" "}
            {currentUser.name}
          </Text>
          <Image
            src={`http://localhost:1337${currentUser.profilePhoto}`}
            alt="image"
            borderRadius="full"
            boxSize="8vh"
            mx="4vh"
          />
        </Flex>
      )}
    </Box>
  );
}

export default UserInfo;
