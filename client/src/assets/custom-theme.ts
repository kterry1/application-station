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
  colors: {
    logoLightBlue: {
      100: "#eaf4ff",
      200: "#d5e8ff",
      300: "#c1ddff",
      400: "#acd1ff",
      500: "#97c6ff",
      600: "#799ecc",
      700: "#5b7799",
      800: "#3c4f66",
      900: "#1e2833",
    },
    logoDarkBlue: {
      100: "#ccd6e0",
      200: "#99adc2",
      300: "#6685a3",
      400: "#335c85",
      500: "#003366",
      600: "#002952",
      700: "#001f3d",
      800: "#001429",
      900: "#000a14",
    },
  },
});
