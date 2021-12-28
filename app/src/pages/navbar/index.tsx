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
  useBreakpointValue,
} from "@chakra-ui/react";
import { EntryNavbarPoint } from "../../components/EntryPoint";
import { Layout } from "../../components/layout";
import theme, { scopedTheme } from "../../styles/theme";
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
import {
  HowToFirstPic,
  HowToSecondPic,
  HowToThirdPic,
} from "../../components/icons/top/topHowToSection/pic";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

interface Props {}

function Index(props: Props) {
  const {} = props;

  return <Navbar />;
}

EntryNavbarPoint(
  <ChakraProvider theme={scopedTheme("#navbar")} resetCSS={false}>
    <Index />
  </ChakraProvider>
);
