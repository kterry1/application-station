import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import "./App.css";
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    customColor: {
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
