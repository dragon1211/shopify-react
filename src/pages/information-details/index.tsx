import React, { useEffect, useState, FC } from "react";
import { 
  ChakraProvider, 
  Box,
  Button,
  HStack,
  ButtonProps,
  Container,
  VStack,
  Image,
  Text,
  Flex,
  BoxProps,
  useBreakpointValue
} from "@chakra-ui/react"
import { EntryPoint } from "../../components/EntryPoint";
import{Layout}from "../../components/layout";
import theme from "../../styles/theme";
import { gql } from "@apollo/client";
import { getGraphqlClient } from "../../utils/gqlClient";
import AboutBgImage from "../../components/images/top/aboutBgImage";
import ChatBubble from "../../components/chatBubble";
import {
  FirstIcon,
  SecondIcon,
  ThirdIcon,
} from "../../components/icons/top/topPointSection/numberIcon";
import {
  FirstPic,
  SecondPic,
  ThirdPic,
} from "../../components/icons/top/topPointSection/pic";
import TriangleRightIcon from "../../components/icons/triangleRightIcon";
import { LineUpTitle } from "../../components/images/top/lineUp";
import { HowToFirstPic, HowToSecondPic, HowToThirdPic } from "../../components/icons/top/topHowToSection/pic";



interface Props {}

function Index(props: Props) {
    const [query, setQuery] = useState('')
    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        console.log('sadf',params);
        setQuery(params.id)
    },[])
    return (
        <Box p="10em">
             information Id: {query || 'id null'}
        </Box>
    )
}


EntryPoint(
  <ChakraProvider theme={theme}>
    <Index />
  </ChakraProvider>
);

