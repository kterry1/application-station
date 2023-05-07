import { ChakraProvider, Flex, extendTheme, useToast } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import "./App.css";
import { useState } from "react";

const customTheme = extendTheme({
  colors: {
    green: {
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
  const [userStatus, setUserStatus] = useState("loggedOut");
  const toast = useToast();

  const handleLogout = async ({ logOutUser, loggedInUserRefetch, client }) => {
    try {
      const result = await logOutUser();

      const statusCode = await result.data.logOutUser.status;
      const message = await result.data.logOutUser.message;
      if (statusCode === 200) {
        await client.clearStore();
        setUserStatus("loggedOut");
        await loggedInUserRefetch();
        return toast({
          title: message,
          status: "success",
          position: "top",
          variant: "solid",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogin = async ({
    accessToken,
    authenticateWithGoogle,
    loggedInUserRefetch,
  }) => {
    try {
      const result = await authenticateWithGoogle({
        variables: {
          input: {
            accessToken: accessToken,
          },
        },
      });
      const statusCode = await result.data.authenticateWithGoogle.status;
      const message = await result.data.authenticateWithGoogle.message;
      if (statusCode === 200) {
        try {
          await loggedInUserRefetch();
          setUserStatus("loggedIn");
        } catch (error) {
          // Handle any errors that occurred during the refetch
          console.error("Error occurred during refetch:", error);
        }
        return toast({
          title: message,
          status: "success",
          position: "top",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Handle any errors that occurred during the mutation
    }
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Flex>
        <Sidebar handleLogin={handleLogin} handleLogout={handleLogout} />
        <Dashboard userStatus={userStatus} />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
