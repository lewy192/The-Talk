import React, { createContext, useState } from "react";

const ChatContext = createContext({});

const ChatProvider = (props) => {
    const [chatState, setChatState] = useState({});

    const setChatUsers = ({ currentUser, recipientUser }) => {
        setChatState({ currentUser, recipientUser });
    };

    return (
        <ChatContext.Provider value={{ chatState, setChatUsers }} {...props} />
    );
};

export { ChatContext, ChatProvider };
