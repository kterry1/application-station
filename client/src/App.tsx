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
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";

function App() {
  const { data: loggedInUserData, refetch: loggedInUserRefetch } =
    useQuery(GET_LOGGED_IN_USER);
  const [authenticateWithGoogle] = useMutation(
    AUTHENTICATE_WITH_GOOGLE_MUTATION
  );
  const [logOutUser] = useMutation(LOG_OUT_USER);
  const client = useApolloClient();
  return (
    <ChakraProvider theme={customTheme}>
      <ErrorBoundary>
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
            loggedInUserRefetch={loggedInUserRefetch}
            loggedInUserData={loggedInUserData}
          />
        </Flex>
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default App;
