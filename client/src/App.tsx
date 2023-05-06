import { ChakraProvider, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import "./App.css";
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    greenButton: {
      100: "#e1e4e4",
      200: "#c3c9c9",
      300: "#a4aeaf",
      400: "#869394",
      500: "#687879",
      600: "#536061",
      700: "#3e4849",
      800: "#2a3030",
      900: "#151818",
    },
    greenSwitch: {
      100: "#e1e4e4",
      200: "#c3c9c9",
      300: "#a4aeaf",
      400: "#869394",
      500: "#687879",
      600: "#536061",
      700: "#3e4849",
      800: "#2a3030",
      900: "#151818",
    },
    red: {
      100: "#fedfdf",
      200: "#fcbfbf",
      300: "#fb9e9e",
      400: "#f97e7e",
      500: "#f85e5e",
      600: "#c64b4b",
      700: "#953838",
      800: "#632626",
      900: "#321313",
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
    blackButton: {
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
    orange: {
      100: "#fee8da",
      200: "#fdd1b5",
      300: "#fcba91",
      400: "#fba36c",
      500: "#fa8c47",
      600: "#c87039",
      700: "#96542b",
      800: "#64381c",
      900: "#321c0e",
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
