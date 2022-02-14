import React, { useState } from "react";
import MenuToggle from "./MenuToggle";
import MenuItem from "./MenuItem";
import Questions from "./Questions";
import Team from "./Team";
import MyProfile from "./MyProfile";
import CompanyInfo from "./CompanyInfo";
import PendingForApproval from "./PendingForApproval";
import { Flex, Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Flex direction={["column", "column", "row"]}>
      <Box
        // border="1px solid black"
        h={["auto", "auto", "90vh"]}
        w={["100vw", "100vw", "25vw"]}
        bgGradient="linear(to-t, pink.200, gray.300)"
        pt="6vh"
        px="2vw"
        boxShadow="8px 0px 5px 0px rgba(0,0,0,0.3)"
      >
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuItem to={"pending"} isOpen={isOpen}>
          Pending for approval
        </MenuItem>
        <MenuItem to={"team"} isOpen={isOpen}>
          Team
        </MenuItem>
        <MenuItem to={"questions"} isOpen={isOpen}>
          Questions
        </MenuItem>
        <MenuItem to={"company-info"} isOpen={isOpen}>
          Company Info
        </MenuItem>
        <MenuItem to={"my-profile"} isOpen={isOpen}>
          My Profile
        </MenuItem>
      </Box>

      <Routes>
        <Route path="pending" element={<PendingForApproval />} />
        <Route path="questions" element={<Questions />} />
        <Route path="team" element={<Team />} />
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="company-info" element={<CompanyInfo />} />
      </Routes>
    </Flex>
  );
}

export default SideBar;
