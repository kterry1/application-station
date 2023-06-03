import { ChakraProvider, Flex } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import Joyride, { CallBackProps } from "react-joyride";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import "./App.css";
import { customTheme } from "./assets/custom-theme";
import {
  GET_LOGGED_IN_USER,
  AUTHENTICATE_WITH_GOOGLE_MUTATION,
  LOG_OUT_USER,
} from "./apollo/queries-and-mutations";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";
import { steps } from "./utils/tourGuide/steps.js";
import { useEffect, useState } from "react";

function App() {
  const { data: loggedInUserData, refetch: loggedInUserRefetch } =
    useQuery(GET_LOGGED_IN_USER);
  const [authenticateWithGoogle] = useMutation(
    AUTHENTICATE_WITH_GOOGLE_MUTATION
  );
  const [logOutUser] = useMutation(LOG_OUT_USER);
  const [stepIndex, setStepIndex] = useState(0);
  const [run, setRun] = useState(false);
  const client = useApolloClient();

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, type } = data;
    if (
      (action === "next" && index === 0) ||
      (type === "step:after" && index === 2)
    ) {
      setStepIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleDemoAccountBtnClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setRun(false);
    setStepIndex((prevIndex) => (prevIndex === 1 ? prevIndex + 1 : prevIndex));
    setRun(true);
  };

  const shouldShowTour = localStorage.getItem("show-tour") !== "false";
  useEffect(() => {
    !loggedInUserData && shouldShowTour ? setRun(true) : setRun(false);
  }, []);

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
            handleDemoAccountBtnClick={handleDemoAccountBtnClick}
          />
          <Dashboard
            logOutUser={logOutUser}
            loggedInUserRefetch={loggedInUserRefetch}
            loggedInUserData={loggedInUserData}
            handleDemoAccountBtnClick={handleDemoAccountBtnClick}
            setRun={setRun}
          />
          {shouldShowTour ? (
            <Joyride
              steps={steps}
              continuous
              callback={handleJoyrideCallback}
              stepIndex={stepIndex}
              run={run}
            />
          ) : null}
        </Flex>
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default App;
