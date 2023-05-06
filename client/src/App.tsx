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
      // 50: "rgba(249, 128, 128, 0.1)",
      // 100: "rgba(249, 128, 128, 0.2)",
      // 200: "rgba(249, 128, 128, 0.3)",
      // 300: "rgba(249, 128, 128, 0.4)",
      // 400: "rgba(249, 128, 128, 0.5)",
      // 500: "rgb(249, 128, 128, 0.6)",
      // 600: "rgba(249, 128, 128, 0.7)",
      // 700: "rgba(249, 128, 128, 0.8)",
      // 800: "rgba(249, 128, 128, 0.9)",
      // 900: "rgba(249, 128, 128, 1)",
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
