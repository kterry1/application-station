import { useGoogleLogin } from "@react-oauth/google";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import {
  useToast,
  Heading,
  Text,
  Avatar,
  Flex,
  Button,
} from "@chakra-ui/react";
import {
  AUTHENTICATE_WITH_GOOGLE_MUTATION,
  GET_LOGGED_IN_USER,
  LOG_OUT_USER,
} from "../queries-and-mutations";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLogout } from "react-icons/ai";

const transformEnum = (str: string = "") =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const GoogleLoginButton = ({
  navSize,
  logOutUser,
  loggedInUserRefetch,
  authenticateWithGoogle,
  loggedInUserData,
  client,
}) => {
  const toast = useToast();
  // const {
  //   loading: loggedInUserLoading,
  //   error: loggedInUserError,
  //   data: loggedInUserData,
  //   refetch: loggedInUserRefetch,
  // } = useQuery(GET_LOGGED_IN_USER);
  // const [authenticateWithGoogle, { loading, error }] = useMutation(
  //   AUTHENTICATE_WITH_GOOGLE_MUTATION
  // );
  // const [logOutUser, { loading: loadingLogOutUser, error: errorLogOutUser }] =
  //   useMutation(LOG_OUT_USER);

  const handleLogout = async () => {
    try {
      const result = await logOutUser();

      const statusCode = await result.data.logOutUser.status;
      const message = await result.data.logOutUser.message;
      if (statusCode === 200) {
        try {
          await client.clearStore();

          await loggedInUserRefetch();
        } catch (error) {
          console.error(error);
        }
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
  const handleLogin = async ({ accessToken }) => {
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
        } catch (error) {
          console.error(error);
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
      console.error(error);
    }
  };

  const login = useGoogleLogin({
    prompt: "consent",
    scope:
      "https://www.googleapis.com/auth/gmail.readonly email profile https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile",
    onSuccess: (tokenResponse) => {
      handleLogin({
        accessToken: tokenResponse.access_token,
      });
    },
  });

  const isLoggedIn = loggedInUserData?.loggedInUser !== null;
  return (
    <>
      {isLoggedIn ? (
        <>
          <Flex
            className="element"
            mt={4}
            align={navSize === "small" ? "center" : "flex-start"}
          >
            <Avatar size="sm" src="" />
            <Flex
              flexDir="column"
              ml={4}
              display={navSize === "small" ? "none" : "flex"}
              color="#fff"
            >
              <Heading as="h3" size="sm">
                {loggedInUserData?.loggedInUser.name}
              </Heading>
              <Text fontSize="xs" as="em">
                {transformEnum(loggedInUserData?.loggedInUser?.role)}
              </Text>
            </Flex>
          </Flex>
          <Button
            mt={4}
            size={navSize === "small" ? "xs" : "sm"}
            onClick={handleLogout}
            rightIcon={<AiOutlineLogout />}
          >
            Logout
          </Button>
        </>
      ) : (
        <Button mt={4} size="sm" onClick={login} rightIcon={<FcGoogle />}>
          Log in with
        </Button>
      )}
    </>
  );
};

export default GoogleLoginButton;
