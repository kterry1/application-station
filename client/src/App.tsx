import { ChakraProvider, Flex } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import "./App.css";
import { customTheme } from "./assets/custom-theme";
import {
  GET_LOGGED_IN_USER,
  AUTHENTICATE_WITH_GOOGLE_MUTATION,
  LOG_OUT_USER,
} from "./apollo/queries-and-mutations";

function App() {
  const {
    loading: loggedInUserLoading,
    error: loggedInUserError,
    data: loggedInUserData,
    refetch: loggedInUserRefetch,
  } = useQuery(GET_LOGGED_IN_USER);
  const [authenticateWithGoogle, { loading, error }] = useMutation(
    AUTHENTICATE_WITH_GOOGLE_MUTATION
  );
  const [
    logOutUser,
    {
      loading: loadingLogOutUser,
      error: errorLogOutUser,
      data: loggedOutUserData,
    },
  ] = useMutation(LOG_OUT_USER);
  const client = useApolloClient();
  return (
    <ChakraProvider theme={customTheme}>
      <Flex>
        <Sidebar
          logOutUser={logOutUser}
          loggedInUserRefetch={loggedInUserRefetch}
          authenticateWithGoogle={authenticateWithGoogle}
          loggedInUserData={loggedInUserData}
          client={client}
        />
        <Dashboard
          logOutUser={logOutUser}
          loggedInUserData={loggedInUserData}
        />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
