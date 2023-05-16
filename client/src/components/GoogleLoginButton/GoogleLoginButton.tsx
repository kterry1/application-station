import { useGoogleLogin } from "@react-oauth/google";
import {
  useToast,
  Heading,
  Text,
  Avatar,
  Flex,
  Button,
} from "@chakra-ui/react";

import { FcGoogle } from "react-icons/fc";
import { AiOutlineLogout } from "react-icons/ai";
import { toastNotification } from "../../utils/toastNotication/toastNotification";

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

  const handleLogout = async () => {
    try {
      const result = await logOutUser();

      const statusCode = result.data.logOutUser.status;
      const message = result.data.logOutUser.message;
      if (statusCode === 200) {
        try {
          await client.clearStore();

          await loggedInUserRefetch();
        } catch (error) {
          console.error(error);
        }
        return toastNotification({ toast, message, status: "success" });
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
      const statusCode = result.data.authenticateWithGoogle.status;
      const message = result.data.authenticateWithGoogle.message;
      if (statusCode === 200) {
        try {
          await loggedInUserRefetch();
        } catch (error) {
          console.error(error);
        }
        return toastNotification({ toast, message, status: "success" });
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

  const isLoggedIn = loggedInUserData?.loggedInUser;

  return (
    <>
      {isLoggedIn ? (
        <>
          <Flex
            className="animate"
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
