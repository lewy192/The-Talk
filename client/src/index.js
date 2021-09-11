import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./context/authContext";
import { ChatProvider } from "./context/chatContext";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

const httpLink = new HttpLink({
    uri: "/graphql",
});

const wsLink = new WebSocketLink({
    uri: "/graphql",
    options: {
        reconnect: true,
        reconnectionAttempts: 20,
    },
});

const link = split(
    ({ query }) => {
        const { kind, opertaion } = getMainDefinition(query);
        return kind === "OperationDefinition" && opertaion === "subscription";
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <AuthProvider>
                <ChatProvider>
                    <App />
                </ChatProvider>
            </AuthProvider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
