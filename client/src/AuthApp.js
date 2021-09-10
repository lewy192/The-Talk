import React, { lazy, useContext } from "react";
import { AuthContext } from "./context/authContext";
import "./AuthApp.scss";
const ChatHeader = lazy(() => import("./components/ChatHeader/ChatHeader"));
const ChatBox = lazy(() => import("./components/ChatBox/ChatBox"));
const ComposeMessage = lazy(() =>
    import("./components/ComposeMessage/ComposeMessage")
);
const Chats = lazy(() => import("./containers/Chats/Chats"));
const AuthApp = () => {
    const { userState } = useContext(AuthContext);
    const { user } = userState;
    console.log(user);
    return (
        <div className="the-talk-home flex">
            <aside className="chats">
                <Chats user={user} />
            </aside>
            {/* <section className="the-talk-room">
                <ChatHeader />
                <ChatBox />
                <ComposeMessage />
            </section> */}
        </div>
    );
};

export default AuthApp;
