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
import { useEffect } from "react";
import { useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { userLogin } from "../redux/AuthReducer/action";
import axios from "axios";
const initState = {
  email: "",
  password: "",
};
const LoginPage = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  // const [msg, setMsg] = useState("");
  const [formstate, setFormstate] = useState(initState);
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const handleTheChange = (e) => {
    setFormstate({ ...formstate, [e.target.name]: e.target.value });
  };

  // ----------------LOGIN SUBMIT--------------------
  const handleTheSubmit = async () => {
    const res = await axios.get("https://white-lovebird-ring.cyclic.app/user");

    if (formstate.email && formstate.password) {
      dispatch(userLogin(formstate)).then((res) => {
        if (res.payload.msg === "user does not exists") {
          toast({
            title: "User Doesn't exist, Please Signup First",
            position: "top",
            status: "warning",
            duration: 2500,
            isClosable: true,
          });
          navigate("/signup");
        } else if (res.payload.msg === "user login successfully") {
          toast({
            title: "Login Successful",
            position: "top",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        } else if (res.payload.msg === "invalid credentials") {
          toast({
            title: "Invalid credentials",
            position: "top",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      });
    } else {
      toast({
        title: "Please fill all the fields",
        position: "top",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // --------------------------------------------

  return (
    <Flex
      minH={"80vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      pt="96px"
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={5} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={{ base: "24px", md: "", lg: "4xl" }}>
            Login to your account
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input name="email" onChange={handleTheChange} type="email" />
            </FormControl>
            {/* Password  */}
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
                      <Icon color={"rgb(0,0,0)"} as={BsFillEyeFill} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"rgb(107,70,193)"} cursor={"pointer"}>Forgot password?</Text>
              </Stack>
              <Link to="/signup">
                <Text color="#6b46c1">New user? Register</Text>
              </Link>
              <Button
                bg={"rgb(0,0,0)"}
                color={"white"}
                fontWeight="bold"
                border="2px solid black"
                _hover={{
                  backgroundColor: "white",
                  color: "black",
                  border: "2px solid black",
                  fontWeight: "bold",
                }}
                onClick={handleTheSubmit}
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
