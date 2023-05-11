import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  DeleteProductData,
  PatchProductData,
  productdata,
  SubProductData,
} from "../redux/CartReducer/action";
import { useToast,Box, Flex, Text, Image, Button, Icon, Wrap } from "@chakra-ui/react";
import { TbTruckDelivery } from "react-icons/tb";
import { Link } from "react-router-dom";
const CartPage = () => {
  const { data } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  // console.log("data in cartPage", data);
  const toast = useToast()
  const subtotal = data.reduce(
    (acc, el) => acc + Number(el.product_price) * Number(el.quantity),
    0
  );
  // console.log(subtotal);
  const handleAdd = (el) => {
    dispatch(PatchProductData(el)).then(() => {
      dispatch(productdata());
    });
  };

  const handleSub = (el) => {
    dispatch(SubProductData(el)).then(() => {
      dispatch(productdata());
    });
  };

  const handleDelete = (el) => {
    dispatch(DeleteProductData(el._id)).then(() => {
      toast({
        title: 'Product Removed',
        status: 'error',
        position:'top',
        duration: 5000,
        isClosable: true,
    })
      dispatch(productdata());
    });
  };

  useEffect(() => {
    dispatch(productdata());
  }, []);
  return (
    <div
      style={{
        width: "90%",
        margin: "auto",
        paddingBottom: "40px",
        paddingTop: "90px",
      }}
    >
      <Text fontWeight={"500"} fontSize="27px">
        Shopping Bag ({data.length})
      </Text>
      <Flex gap="70px">
        <Box marginTop="30px" width="55%">
          {data.map((el) => (
            <Flex
              justifyContent={"space-around"}
              borderTop={"1px solid grey"}
              borderBottom={"1px solid grey"}
              padding="20px"
              key={el._id}
            >
              <Image src={el.product_img} width="200px"></Image>
              <Box textAlign={"start"} lineHeight="40px" marginTop="20px">
                <Text fontWeight={"500"} fontSize="18px">
                  {el.product_title}
                </Text>
                <Text fontWeight={"500"} fontSize="18px">
                  Category: {el.product_category}
                </Text>
                <Flex gap="20px">
                  <Text fontWeight={"500"} fontSize="18px">
                    price: ₹{Number(el.product_price) * Number(el.quantity)}
                  </Text>
                  <Flex gap="10px">
                    <Text fontWeight={"500"} fontSize="18px">
                      Quantity :{" "}
                    </Text>
                    <Button
                      bg="transparent"
                      _hover={{ bg: "transparent" }}
                      fontWeight={"600"}
                      fontSize="22px"
                      cursor={"pointer"}
                      isDisabled={Number(el.quantity) == 1}
                      onClick={() => handleSub(el)}
                    >
                      -
                    </Button>
                    <Text fontWeight={"500"} fontSize="20px">
                      {el.quantity}
                    </Text>
                    <Button
                      bg="transparent"
                      _hover={{ bg: "transparent" }}
                      fontWeight={"600"}
                      fontSize="22px"
                      cursor={"pointer"}
                      onClick={() => handleAdd(el)}
                    >
                      +
                    </Button>
                  </Flex>
                </Flex>
                <Button marginTop="20px" onClick={() => handleDelete(el)}>
                  Remove
                </Button>
              </Box>
            </Flex>
          ))}
        </Box>
        <Box width="40%">
          <Box
            backgroundColor={"#f6f6f6"}
            padding="10px"
            paddingBottom={"20px"}
            width="90%"
            margin="auto"
          >
            <Flex gap="30px">
              <Box width="70%">
                <Text fontWeight={"500"} fontSize="17px">
                  Subtotal
                </Text>
              </Box>
              <Box width="20%">
                <Text fontWeight={"500"} fontSize="17px">
                  ₹{subtotal}
                </Text>
              </Box>
            </Flex>
            <Flex gap="30px" marginTop="10px">
              <Box width="70%">
                <Text fontWeight={"500"} fontSize="17px">
                  Estimated Shipping
                </Text>
              </Box>
              <Box width="20%">
                <Text fontWeight={"500"} fontSize="17px">
                  Free
                </Text>
              </Box>
            </Flex>
            <Flex gap="30px" marginTop="10px">
              <Box width="70%">
                <Text fontWeight={"500"} fontSize="17px">
                  Sales Tax
                </Text>
              </Box>
              <Box width="30%">
                <Text fontWeight={"500"} fontSize="18px">
                  ₹{Number(subtotal) * 0.05}
                </Text>
              </Box>
            </Flex>
            <hr />
            <Flex gap="30px" marginTop="10px">
              <Box width="70%">
                <Text fontWeight={"500"} fontSize="20px">
                  Total
                </Text>
              </Box>
              <Box width="20%">
                <Text fontWeight={"500"} fontSize="20px">
                  ₹{subtotal + Number(subtotal) * 0.05}
                </Text>
              </Box>
            </Flex>
            <Link to="/checkout">
              <Button
                marginTop="20px"
                padding="10px 110px 10px 110px"
                fontWeight={"bold"}
                marginLeft={"30px"}
                backgroundColor="#000000"
                color="white"
                _hover={{
                  backgroundColor: "white",
                  color: "black",
                  border: "2px solid black",
                  fontWeight: "bold",
                }}
              >
                CHECKOUT ({data.length})
              </Button>
            </Link>
          </Box>
          <Flex gap="10px" marginTop="20px">
            <Image src="https://content.shoprunner.com/assets/pik_images/v4/_sr_logo.svg"></Image>
            <Text fontSize={"13px"} fontWeight="500">
              Order now and get it with FREE 2-Day Shipping (excludes pre-order
              items).Learn more | Sign in
            </Text>
          </Flex>
          <Flex gap="10px" marginTop="20px">
            <Icon as={TbTruckDelivery} fontSize={"20px"} fontWeight="500" />
            <Text fontSize={"18px"} fontWeight="500">
              FREE DELIVERY & RETURNS
            </Text>
          </Flex>
          <Box>
            <Text fontSize={"20px"} fontWeight="500">
              BURBERRY ACCEPTS
            </Text>
          </Box>
          <Wrap marginTop="30px">
            <Image
              src="https://us.burberry.com/nrws/checkout/4048ace88865c40604d0e5b5842fea6c4f68ab47/_next/static/images/payment-types/applepay.png"
              width="70px"
            ></Image>
            <Image
              src="https://us.burberry.com/nrws/checkout/4048ace88865c40604d0e5b5842fea6c4f68ab47/_next/static/images/payment-types/visa.png"
              width="70px"
            ></Image>
            <Image
              src="https://us.burberry.com/nrws/checkout/4048ace88865c40604d0e5b5842fea6c4f68ab47/_next/static/images/payment-types/mc.png"
              width="70px"
            ></Image>
            <Image
              src="https://us.burberry.com/nrws/checkout/4048ace88865c40604d0e5b5842fea6c4f68ab47/_next/static/images/payment-types/amex.png"
              width="70px"
            ></Image>
            <Image
              src="https://us.burberry.com/nrws/checkout/4048ace88865c40604d0e5b5842fea6c4f68ab47/_next/static/images/payment-types/discover.png"
              width="70px"
            ></Image>
            <Image
              src="https://us.burberry.com/nrws/checkout/4048ace88865c40604d0e5b5842fea6c4f68ab47/_next/static/images/payment-types/paypal.png"
              width="70px"
            ></Image>
            <Image
              src="https://us.burberry.com/nrws/checkout/4048ace88865c40604d0e5b5842fea6c4f68ab47/_next/static/images/payment-types/jcb.png"
              width="70px"
            ></Image>
          </Wrap>
        </Box>
      </Flex>
    </div>
  );
};

export default CartPage;
