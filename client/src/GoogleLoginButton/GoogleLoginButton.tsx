import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@apollo/client";
import {
  AUTHENTICATE_WITH_GOOGLE_MUTATION,
  IMPORT_MULTIPLE_COMPANY_APPLICATIONS,
} from "../getUserCompanyApplications";

const GoogleLoginButton = () => {
  const [authenticateWithGoogle, { loading, error }] = useMutation(
    AUTHENTICATE_WITH_GOOGLE_MUTATION
  );
  const [importCompanyApplications, { loading: load, error: err }] =
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

      // Create Toast Notification
      console.log(result);
    } catch (error) {
      // Handle any errors that occurred during the mutation
    }
  };

  const handleImport = async () => {
    try {
      const importResult = await importCompanyApplications();
      console.log(importResult);
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
  return (
    <>
      <button onClick={() => login()}>Sign in with Google 🚀 </button>
      <div>{load && "LOADING!!!"}</div>
      <button onClick={() => handleImport()}>Import </button>
    </>
  );
};

export default GoogleLoginButton;
