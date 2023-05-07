import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  from,
} from "@apollo/client";
import App from "./App.tsx";
import "./index.css";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  fetchOptions: {
    mode: "cors",
  },
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
    },
  }));
  return forward(operation);
});

const link = from([authLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
const clientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={client}>
    <GoogleOAuthProvider clientId={clientId}>
      <>
        <App />
      </>
    </GoogleOAuthProvider>
  </ApolloProvider>
);
