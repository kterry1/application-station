import { useGoogleLogin } from "@react-oauth/google";
import { useMutation, useQuery } from "@apollo/client";
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
} from "../getUserCompanyApplications";

const transformEnum = (str: string = "") =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const GoogleLoginButton = ({ navSize }: { navSize: string }) => {
  const toast = useToast();
  const {
    loading: loggedInUserLoading,
    error: loggedInUserError,
    data: loggedInUserData,
    refetch: loggedInUserRefetch,
  } = useQuery(GET_LOGGED_IN_USER);
  const [authenticateWithGoogle, { loading, error }] = useMutation(
    AUTHENTICATE_WITH_GOOGLE_MUTATION
  );

  const handleLogin = async (accessToken: string) => {
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
          // Do any additional actions you need after the refetch is complete
        } catch (error) {
          // Handle any errors that occurred during the refetch
          console.error("Error occurred during refetch:", error);
        }
        return toast({
          title: message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Handle any errors that occurred during the mutation
    }
  };

  const login = useGoogleLogin({
    prompt: "consent",
    scope:
      "https://www.googleapis.com/auth/gmail.readonly email profile https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile",
    onSuccess: (tokenResponse) => {
      handleLogin(tokenResponse.access_token);
    },
  });

  const isLoggedIn = loggedInUserData?.loggedInUser !== null;
  return (
    <>
      {isLoggedIn ? (
        <Flex mt={4} align={navSize === "small" ? "center" : "flex-start"}>
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
      ) : (
        <Button size="sm" onClick={() => login()}>
          Sign in with Google
        </Button>
      )}
    </>
  );
};

export default GoogleLoginButton;
