import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./context/authContext";
import { ChatProvider } from "./context/chatContext";

const client = new ApolloClient({
    uri: "/graphql",
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
