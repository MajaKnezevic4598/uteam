import React, { useContext } from "react";
import { Flex, Button, Image, Text, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { isLoggedIn, logOut } = useContext(AuthContext);
  const authUser = window.localStorage.getItem("jwt");
  // console.log(authUser);
  return (
    <Flex
      w="100vw"
      h={["auto", "20vh", "10vh"]}
      bgColor="gray.100"
      color="litherBlack"
      direction={["column", "row", "row"]}
      align="center"
      bgGradient="linear(to-r,gray.500, white)"
      boxShadow="lg"
    >
      <Image
        src="../assets/flower-logo.png"
        h="20vh"
        mt="4vh"
        ml="2vw"
        position="relative"
        zIndex="3"
      />
      <Text fontSize="4vh" fontWeight="bold" letterSpacing="0.1vw">
        Uteam
      </Text>
      <Spacer />
      <p>{`${isLoggedIn}`}</p>
      <Link to="/">
        {authUser ? (
          <Button colorScheme="teal" onClick={logOut}>
            Loggout
          </Button>
        ) : (
          <Button colorScheme="blue">Login</Button>
        )}
      </Link>
      <Link to="/register">
        <Button
          colorScheme="blue"
          mr="2vw"
          ml="2vw"
          disabled={authUser ? true : false}
        >
          Register
        </Button>
      </Link>
    </Flex>
  );
}

export default Header;
