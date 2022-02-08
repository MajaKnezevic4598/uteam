import React from "react";
import { Box } from "@chakra-ui/react";
import { SmallCloseIcon, HamburgerIcon } from "@chakra-ui/icons";

function MenuToggle({ toggle, isOpen }) {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <SmallCloseIcon /> : <HamburgerIcon />}
    </Box>
  );
}

export default MenuToggle;
