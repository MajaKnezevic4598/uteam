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

import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EmailIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { AuthContext } from "../context/AuthContext";

// import { authUser } from "../services/authUser";

//useful functionality for register component would be to unable to register a user while you are logged in
function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn, handleUserRegister } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("files", data.profileImage[0]);
    const response = await handleUserRegister(formData, data);
    if (response) {
      setIsLoading(false);
      setIsLoggedIn(true);
      navigate("/sidebar");
    }
    // } else {
    //   setIsLoading(false);
    //   navigate("/register");
    // }
  };
  return (
    <Flex width="full" align="center" justifyContent="center" mt="4vh">
      <Box p={6} width="35vw" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Box textAlign="center">
          <Heading>Register</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit(handleRegister)}>
            <FormControl mb="2vh" isRequired>
              <FormLabel>Name:</FormLabel>
              <Input
                type="text"
                placeholder="Name"
                {...register("username", {
                  required: "Name is requred",
                  pattern: {
                    value: /^[a-zA-Z]+$/g,
                    message: "Name can not contain numbers",
                  },
                })}
                onKeyUp={() => {
                  trigger("username");
                }}
              />
              {errors.username && (
                <Text fontSize="2vh" mt="1vh" color="red.400">
                  {errors.username.message}
                </Text>
              )}
            </FormControl>
            <FormControl mb="2vh" isRequired>
              <FormLabel>Email:</FormLabel>
              <InputGroup>
                <Input
                  type="email"
                  placeholder="test@test.com"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("email");
                  }}
                />
                <InputRightElement>
                  <EmailIcon color="blue.500" />
                </InputRightElement>
              </InputGroup>
              {errors.email && (
                <Text fontSize="2vh" mt="1vh" color="red.400">
                  {errors.email.message}
                </Text>
              )}
            </FormControl>

            <FormControl mb="2vh" isRequired>
              <FormLabel>Company:</FormLabel>

              <Input
                type="text"
                placeholder="Company"
                {...register("company", {
                  required: "company is required",
                })}
                onKeyUp={() => {
                  trigger("company");
                }}
              />

              {errors.company && (
                <Text fontSize="2vh" mt="1vh" color="red.400">
                  {errors.company.message}
                </Text>
              )}
            </FormControl>

            <FormControl mb="2vh" isRequired>
              <FormLabel>Password:</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="*******"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                    maxLength: {
                      value: 15,
                      message: "Password must not be longer than 15 characters",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("password");
                  }}
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
              {errors.password && (
                <Text fontSize="2vh" mt="1vh" color="red.400">
                  {errors.password.message}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Profile Photo:</FormLabel>
              <Input
                type="file"
                placeholder="Upload Photo"
                accept=".png, .jpg, .jpeg"
                variant="unstyled"
                ml="2wv"
                {...register("profileImage")}
              />
            </FormControl>
            <Link to="/">
              <Button variant="link" mt="4vh" mb="2vh">
                Alredy have an account?
              </Button>
            </Link>
            <Button type="submit" variant="solid" width="full" mt={4}>
              {isLoading ? (
                <CircularProgress isIndeterminate size="24px" color="teal" />
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default Register;
