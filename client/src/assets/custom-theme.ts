import { extendTheme } from "@chakra-ui/react";
export const customTheme = extendTheme({
  breakpoints: {
    sm: "20rem", // base - 320px
    md: "30rem", // 480px
    lg: "48rem", // 768px
    xl: "62rem", // 992px
    "2xl": "80rem", // 1280px
    "3xl": "94rem", // 1504px
    "4xl": "110rem", // 1760px
  },
});
