import React from "react";
import { Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const MenuItem = ({ children, to = "/", isOpen, ...rest }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
      mb="1vh"
      fontSize="2.8vh"
      _hover={{
        boxShadow: "2px 2px 6px 2px rgba(0,0,0,0.75) inset",
        borderRadius: "8px",
      }}
      px="1vw"
      py="1vh"
    >
      <Link to={to}>
        <Text display="block" {...rest}>
          {children}
        </Text>
      </Link>
    </Box>
  );
};

export default MenuItem;
