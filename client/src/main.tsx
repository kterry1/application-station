import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import App from "./App.tsx";
import "./index.css";
import { ReactNode, createContext, useState } from "react";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  fetchOptions: {
    mode: "cors",
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/subscriptions",
    lazy: true,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
const clientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;

interface ContextValue {
  toggleForImport: boolean;
  setToggleForImport: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Context = createContext<ContextValue | null>(null);

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [toggleForImport, setToggleForImport] = useState<boolean>(false);
  return (
    <Context.Provider value={{ toggleForImport, setToggleForImport }}>
      {children}
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={client}>
    <GoogleOAuthProvider clientId={clientId}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </GoogleOAuthProvider>
  </ApolloProvider>
);
