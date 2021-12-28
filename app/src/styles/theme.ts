import { extendTheme } from "@chakra-ui/react";

type ArgOf<X> = X extends (...args: infer R) => any ? R : never;
type Theme = ArgOf<typeof extendTheme>[0];
const defaultTheme: Theme = {
  styles: {
    global: {
      'html, body': {
        fontFamily: "Yu Gothic Pr6N R, sans-serif",
        color:"#493E34",
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        textTransform: "none",
        letterSpacing: "unset",
      },
      variants: {
        h1: {
          fontSize: "32px",
          as: "h1",
        },
        h2: {
          fontSize: "24px",
          as: "h2",
        },
        h3: {
          fontSize: "18.72px",
          as: "h3",
        },
        h4: {
          fontSize: "16px",
          as: "h4",
        },
        h5: {
          fontSize: "13.28 px",
          as: "h5",
        },
        h6: {
          fontSize: "10.72px",
          as: "h6",
        },
      },
    },

    Button: {
      // 1. We can update the base styles
      baseStyle: {
        // fontWeight: "bold", // Normally, it is "semibold"
        _focus: {
          outline: "none",
          boxShadow: "none",
        },
      },
      // 2. We can add a new button size or extend existing
      sizes: {
        xl: {
          h: "56px",
          fontSize: "lg",
          px: "32px",
        },
      },
      // 3. We can add a new visual variant
      variants: {
        "with-shadow": {
          bg: "red.400",
          boxShadow: "0 0 2px 2px #efdfde",
        },
        topLineUP: {
          w: "160px",
        },
        primary: {
          bg: "#EB6860",
          color: "white",
          fontWeight: "normal",
          border: "1px solid #EB6860",
          _hover: {
            bg: "white",
            color: "#EB6860",
            border: "1px solid #EB6860",
          },
        },
        iconPrimary: {
          color: "#EB6860",
        },
        primaryTop: {
          bg: "#EB6860",
          color: "white",
          fontWeight: "normal",
          height: "70px",
          borderRadius: "full",
          px: "2em",
          border: "2px solid #EB6860",
          _hover: {
            bg: "white",
            color: "#EB6860",
            border: "2px solid #EB6860",
          },
        },
        accent: {
          color: "#EB6860",
          fontWeight: "normal",
          px: "0px",
          _hover: {
            opacity: "50%",
          },
        },
        accentBordered: {
          color: "#EB6860",
          fontWeight: "normal",
          px: "0px",
          border: "1px solid #EB6860",
          _hover: {
            opacity: "50%",
          },
        },
        // 4. We can override existing variants
        // solid: (props) => ({
        //   bg: props.colorMode === "dark" ? "red.300" : "red.500",
        // }),
      },
    },
    Text: {
      baseStyle: {
        color:"inherit",
      },
      variants: {
        primary: {
          color: "#EB6860",
        },
        pageTitle: {
          fontSize: { base: "26px", md: "40px" },
          letterSpacing: ".15em",
        },
        topDescription: {
          lineHeight: "32px",
          letterSpacing: ".25em",
          mt: {
            base: "50px",
            md: "60px",
          },
        },
      },
    },
  },
};

const theme = extendTheme(defaultTheme);

export default theme;

export const scopedTheme = (selector: string) =>
  extendTheme({
    ...defaultTheme,
    styles: {
      ...defaultTheme.styles,
      global: {
        [selector]: {
          fontFamily: "Yu Gothic Pr6N R, sans-serif",
        },
      },
    },
  });
