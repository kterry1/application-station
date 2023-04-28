import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <Flex>
        <Sidebar />
        <Dashboard />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
