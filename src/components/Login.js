import {
  Flex,
  Box,
  Heading,
  FormLabel,
  Input,
  FormControl,
  Button,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

import { EmailIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import validator from "validator";
import { Link } from "react-router-dom";
import { authUser } from "../services/authUser";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("jello");
    console.log(email, password);
    setEmail("");
    setPassword("");
    setEmailError("");
    await authUser(email, password);
    console.log("next line");
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailValidation = () => {
    if (validator.isEmail(email)) {
      setEmailError("Valid email");
    } else {
      setEmailError("Enter valid email");
    }
  };

  return (
    <Flex width="full" align="center" justifyContent="center" mt="8vh">
      <Box p={8} width="35vw" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <InputGroup>
                <Input
                  type="email"
                  placeholder="test@test.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onKeyUp={handleEmailValidation}
                />
                <InputRightElement>
                  <EmailIcon color="blue.500" />
                </InputRightElement>
              </InputGroup>
              <Text fontSize="2vh" mt="1vh" color="blue.400">
                {emailError}
              </Text>
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="*******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            <Link to="/register">
              <Button
                variant="link"
                mt="4vh"
                mb="2vh"
              >{`Don\t have an account?`}</Button>
            </Link>
            <Button type="submit" variant="solid" width="full" mt={4}>
              Sign In
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default Login;
