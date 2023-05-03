import React from "react";
import { useGoogleLogin } from "@react-oauth/google";

async function fetchEmailsFromBackend(accessToken) {
  const response = await fetch("http://localhost:3001/fetch-emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessToken }),
  })
    .then((emails) => {
      return emails;
    })
    .catch((error) => {
      console.error("Error fetching emails:", error);
    });

  if (response?.ok) {
    const emails = await response.json();
    return emails;
  } else {
    throw new Error(`Failed to fetch emails: ${response.status}`);
  }
}

const GoogleLoginButton = () => {
  const login = useGoogleLogin({
    prompt: "consent",
    scope:
      "https://www.googleapis.com/auth/gmail.readonly email profile https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile",
    onSuccess: (tokenResponse) => {
      fetchEmailsFromBackend(tokenResponse.access_token);
    },
  });
  return <button onClick={() => login()}>Sign in with Google 🚀 </button>;
};

export default GoogleLoginButton;
