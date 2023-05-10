import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  ChakraProvider,
  CloseButton,
  Flex,
} from "@chakra-ui/react";
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
            loggedInUserData={loggedInUserData}
          />
        </Flex>
        <Alert
          px="10px"
          h="160px"
          w="200px"
          pos="absolute"
          right="0"
          top="0"
          borderRadius="5px"
          status="error"
        >
          <Flex alignItems="flex-start" justifyContent="flex-start">
            <Flex flexDir="column" justifyContent="space-between">
              <AlertIcon />
              <AlertTitle>Unable to classify 10 applications.</AlertTitle>
              <AlertDescription>
                Click on a row to view edit or upgrade.
              </AlertDescription>
            </Flex>
            <CloseButton />
          </Flex>
        </Alert>
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default App;
