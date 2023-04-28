import { ChakraProvider, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import "./App.css";
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    green: {
      100: "#eff4f4",
      200: "#dfe9ea",
      300: "#cededf",
      400: "#bed3d5",
      500: "#aec8ca",
      600: "#8ba0a2",
      700: "#687879",
      800: "#465051",
      900: "#232828",
    },
    red: {
      50: "rgba(249, 128, 128, 0.1)",
      100: "rgba(249, 128, 128, 0.2)",
      200: "rgba(249, 128, 128, 0.3)",
      300: "rgba(249, 128, 128, 0.4)",
      400: "rgba(249, 128, 128, 0.5)",
      500: "rgb(249, 128, 128)",
      600: "rgba(249, 128, 128, 0.7)",
      700: "rgba(249, 128, 128, 0.8)",
      800: "rgba(249, 128, 128, 0.9)",
      900: "rgba(249, 128, 128, 1)",
    },
    blue: {
      50: "#dbe9f97e",
      100: "#dbe8f9",
      200: "#b7d3f3",
      300: "#92bcee",
      400: "#6ea6e8",
      500: "#4a90e2",
      600: "#3b73b5",
      700: "#2c5688",
      800: "#1e3a5a",
      900: "#0f1d2d",
    },
    yellow: {
      100: "#f9efcc",
      200: "#f3de99",
      300: "#edce67",
    },
    black: {
      100: "#fcfcfcd1",
      200: "#f6f6f6a3",
      300: "#ececec75",
      400: "#d3d3d347",
      500: "#0000001a",
      600: "#00000047",
      700: "#00000075",
      800: "#000000a3",
      900: "#000000d1",
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <Flex>
        <Sidebar />
        <Dashboard />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
