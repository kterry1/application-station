import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@apollo/client";
import {
  AUTHENTICATE_WITH_GOOGLE_MUTATION,
  IMPORT_MULTIPLE_COMPANY_APPLICATIONS,
} from "../getUserCompanyApplications";

const GoogleLoginButton = () => {
  const [token, setToken] = useState("");
  const [authenticateWithGoogle, { loading, error }] = useMutation(
    AUTHENTICATE_WITH_GOOGLE_MUTATION
  );
  const [importMultipleCompanyApplications, { loading: load, error: err }] =
    useMutation(IMPORT_MULTIPLE_COMPANY_APPLICATIONS);

  const handleLogin = async (accessToken: string) => {
    try {
      const result = await authenticateWithGoogle({
        variables: {
          input: {
            accessToken: accessToken,
          },
        },
      });
      localStorage.setItem("token", result.data.authenticateWithGoogle.jwt);

      // Handle the response (e.g., store the JWT in a cookie, update the UI)
    } catch (error) {
      // Handle any errors that occurred during the mutation
    }
  };

  const handleImport = async (accessToken: string) => {
    try {
      const importResult = await importMultipleCompanyApplications({
        variables: {
          input: {
            accessToken: accessToken,
          },
        },
      });
      console.log(importResult);

      // Handle the response (e.g., store the JWT in a cookie, update the UI)
    } catch (error) {
      // Handle any errors that occurred during the mutation
    }
  };

  const login = useGoogleLogin({
    prompt: "consent",
    scope:
      "https://www.googleapis.com/auth/gmail.readonly email profile https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile",
    onSuccess: (tokenResponse) => {
      setToken(tokenResponse.access_token);
    },
  });
  return (
    <>
      <button onClick={() => login()}>Sign in with Google 🚀 </button>
      <button onClick={() => handleLogin(token)}>run later </button>
      <div></div>
      <button onClick={() => handleImport(token)}>Import </button>
    </>
  );
};

export default GoogleLoginButton;
