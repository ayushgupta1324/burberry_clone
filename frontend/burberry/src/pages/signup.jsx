import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  Icon,
  useColorModeValue,
  InputRightElement,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../redux/AuthReducer/action";

const initState = {
  username: "",
  email: "",
  password: "",
};

const SignIn = () => {
  const store = useSelector((store) => store.auth);

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [formstate, setFormstate] = useState(initState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  // console.log(isAuth)

  const handleTheChange = (e) => {
    setFormstate({ ...formstate, [e.target.name]: e.target.value });
  };
  const handleTheSubmit = () => {
    // console.log(formstate)

    if (formstate.email && formstate.password && formstate.username) {
      dispatch(userRegister(formstate)).then((res) => {
        if (res.payload.msg === "user already exists") {
          toast({
            title: "User Already Exists",
            position: "top",
            status: "warning",
            duration: 2000,
            isClosable: true,
          });
        } else if (res.payload.msg === "signup successful") {
          toast({
            title: "Registered Successfully",
            position: "top",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      });
    } else {
      toast({
        title: "Please Fill The Required Fields",
        position: "top",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH={"80vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      pt="90px"
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={5} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"3xl"}>Register</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input onChange={handleTheChange} name="username" type="text" />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input onChange={handleTheChange} type="email" name="email" />
            </FormControl>
            {/* -----------Password----------------------  */}
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  name="password"
                  onChange={handleTheChange}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                />
                <InputRightElement>
                  <Button
                    _hover={{}}
                    bg={"none"}
                    size="sm"
                    onClick={handleClick}
                  >
                    {show ? (
                      <Icon color={"rgb(0,0,0)"} as={BsFillEyeSlashFill} />
                    ) : (
                      <Icon color={"rgb(107,70,193)"} as={BsFillEyeFill} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {/* <FormControl id="password">
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    name="password"
                    onChange={handleTheChange}
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  
                </InputGroup>
              </FormControl> */}
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"rgb(107,70,193)"} cursor={"pointer"}>Forgot password?</Text>
              </Stack>
              <Link to="/login">
                <Text color="#6b46c1">Already a user? Login</Text>
              </Link>
              <Button
                bg={"rgb(255,255,255)"}
                color={"black"}
                fontWeight="bold"
                border="2px solid black"
                _hover={{
                  backgroundColor: "black",
                  color: "white",
                  border: "2px solid black",
                  fontWeight: "bold",
                }}
                onClick={handleTheSubmit}
              >
                Register
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignIn;
