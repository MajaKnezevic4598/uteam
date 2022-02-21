import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContex";
import { AuthContext } from "../context/AuthContext";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  InputRightElement,
  InputGroup,
  FormHelperText,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function MyProfile() {
  const [newPassword, setNewPassword] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [borderStyle, setBorderStyle] = useState(false);

  const { currentUser } = useContext(UserContext);
  const { handlePasswordChange } = useContext(AuthContext);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    await handlePasswordChange(currentUser.email, currPassword, newPassword);
  };
  return (
    <Box mx="auto" mt="5vh" border="1px solid black" width="60vw">
      <Heading fontSize="3vh" textAlign="center">
        My Profile
      </Heading>
      <Flex justify="space-around">
        <Box mt="4vh" border="1px solid gray" borderRadius="8px" p={6} w="25vw">
          <form>
            <Text borderBottom="1px solid black" mb="4vh" fontWeight="bold">
              {" "}
              Basic Info
            </Text>
            <Text>Name:</Text>
            <Box
              p={2}
              border="1px solid gray"
              borderRadius="8px"
              color="gray.400"
              mb="3vh"
            >
              {currentUser.name}
            </Box>
            <FormControl mb="4vh">
              <FormLabel htmlFor="file">Profile Photo:</FormLabel>
              <Input id="file" type="file" />
            </FormControl>
            <Flex justify="flex-end">
              <Button type="submit">Save</Button>
            </Flex>
          </form>
        </Box>
        <Box border="1px solid gray" borderRadius="8px" p={6} mt="4vh" w="25vw">
          {" "}
          <form onSubmit={handlePasswordSubmit}>
            <Text borderBottom="1px solid black" mb="4vh" fontWeight="bold">
              {" "}
              Security
            </Text>
            <Text>Email:</Text>
            <Text mb="3vh"> {currentUser.email}</Text>
            <FormControl mb="4vh">
              <FormLabel htmlFor="curPassword">Current Password:</FormLabel>
              {/* <Input id="currPassword" type="password" /> */}
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="*******"
                  value={currPassword}
                  onChange={(e) => setCurrPassword(e.target.value)}
                />
                <InputRightElement width="3rem">
                  <Button
                    h="1.5rem"
                    size="sm"
                    onClick={handlePasswordVisibility}
                  >
                    {showPassword ? (
                      <ViewIcon color="blue.500" />
                    ) : (
                      <ViewOffIcon color="blue.500" />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl mt={6} isRequired mb="4vh">
              <FormLabel>New Password:</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="*******"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onKeyUp={() => {
                    if (newPassword.length >= 6) {
                      console.log("dugacka dovoljno");
                      setBorderStyle(true);
                    }
                  }}
                  focusBorderColor={borderStyle ? "green.400" : "red.400"}
                />
                <InputRightElement width="3rem">
                  <Button
                    h="1.5rem"
                    size="sm"
                    onClick={handlePasswordVisibility}
                  >
                    {showPassword ? (
                      <ViewIcon color="blue.500" />
                    ) : (
                      <ViewOffIcon color="blue.500" />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText>
                Password must be at least 6 characters long
              </FormHelperText>
            </FormControl>
            <Flex justify="flex-end">
              <Button type="submit">Save</Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}

export default MyProfile;
