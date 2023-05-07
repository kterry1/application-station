import { useGoogleLogin } from "@react-oauth/google";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import {
  useToast,
  Heading,
  Text,
  Avatar,
  Flex,
  Button,
  IconButton,
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

const GoogleLoginButton = ({ navSize, handleLogout, handleLogin }) => {
  const toast = useToast();
  const client = useApolloClient();
  const {
    loading: loggedInUserLoading,
    error: loggedInUserError,
    data: loggedInUserData,
    refetch: loggedInUserRefetch,
  } = useQuery(GET_LOGGED_IN_USER);
  const [authenticateWithGoogle, { loading, error }] = useMutation(
    AUTHENTICATE_WITH_GOOGLE_MUTATION
  );
  const [logOutUser, { loading: loadingLogOutUser, error: errorLogOutUser }] =
    useMutation(LOG_OUT_USER);

  const login = useGoogleLogin({
    prompt: "consent",
    scope:
      "https://www.googleapis.com/auth/gmail.readonly email profile https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile",
    onSuccess: (tokenResponse) => {
      handleLogin({
        accessToken: tokenResponse.access_token,
        authenticateWithGoogle,
        loggedInUserRefetch,
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
            onClick={() =>
              handleLogout({ logOutUser, loggedInUserRefetch, client })
            }
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
