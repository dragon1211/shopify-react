import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { EntryFooterPoint } from "../../components/EntryPoint";
import Footer from "../../components/footer";
import theme, { scopedTheme } from "../../styles/theme";

interface Props {}

function Index(props: Props) {
  const {} = props;

  return <Footer />;
}

EntryFooterPoint(
  <ChakraProvider theme={scopedTheme("#footer")} resetCSS={false}>
    <Index />
  </ChakraProvider>
);
