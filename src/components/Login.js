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
  CircularProgress,
} from "@chakra-ui/react";

import { EmailIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authUser } from "../services/authUser";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContex";
import { user, getUser } from "../services/user";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const { setIsLoggedIn, setJwt, jwt, setAuthUser } = useContext(AuthContext);
  const { setCurrentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  //isLoading is using for chakra ui spiner button

  const navigate = useNavigate();
  const local = window.localStorage.getItem("jwt");
  if (local !== null) window.localStorage.setItem("jwt", local);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("from register");
    console.log(jwt);
    const response = await authUser(email, password);
    if (response.status === 200) {
      setIsLoading(false);
      setJwt(response.data.jwt);
      setIsLoggedIn(true);
      setAuthUser("autorizovan");

      const responseUser = await user();
      const responseFromGetUser = await getUser(responseUser.data.id);
      console.log(responseFromGetUser);
      console.log("***************************************************");
      setCurrentUser({
        name: responseFromGetUser.data.data[0].attributes.name,
        profilePhoto:
          responseFromGetUser.data.data[0].attributes.profilePhoto.data
            .attributes.url,
      });
      navigate("/sidebar");
    }
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
            <FormControl isRequired>
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
            <FormControl mt={6} isRequired>
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
              {isLoading ? (
                <CircularProgress isIndeterminate size="24px" color="teal" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default Login;
