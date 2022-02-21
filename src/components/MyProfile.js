import React, { useState } from "react";
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
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function MyProfile() {
  const [newPassword, setNewPassword] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              Current name of the user
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
          <form>
            <Text borderBottom="1px solid black" mb="4vh" fontWeight="bold">
              {" "}
              Security
            </Text>
            <Text>Email:</Text>
            <Text mb="3vh">Email of current User</Text>
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
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="*******"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
