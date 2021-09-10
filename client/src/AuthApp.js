import React, { lazy, useContext, useState } from "react";
import { AuthContext } from "./context/authContext";
import "./AuthApp.scss";
import TalkRoom from "./containers/TalkRoom/TalkRoom";
import { ChatContext } from "./context/chatContext";

const Chats = lazy(() => import("./containers/Chats/Chats"));
const AuthApp = () => {
    const { userState } = useContext(AuthContext);
    const { user } = userState;
    const { chatState } = useContext(ChatContext);
    console.log(chatState);
    console.log("app render");
    return (
        <div className="the-talk-home flex">
            <aside className="chats">
                <Chats user={user} />
            </aside>
            {chatState?.recipientUser ? (
                <TalkRoom currentUser={user} users={chatState} />
            ) : (
                <div className="choose-user">Choose User</div>
            )}
        </div>
    );
};

export default AuthApp;
