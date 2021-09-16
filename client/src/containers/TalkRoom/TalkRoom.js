import React, { useState, lazy, useContext } from "react";
import { ChatContext } from "../../context/chatContext";
import "./TalkRoom.scss";
const ChatHeader = lazy(() =>
    import("./../../components/ChatHeader/ChatHeader")
);
const ChatBody = lazy(() => import("../../components/ChatBody/ChatBody"));
const ComposeMessage = lazy(() =>
    import("./../../components/ComposeMessage/ComposeMessage")
);

const TalkRoom = (props) => {
    const { users } = props;
    const { recipientUser, currentUser } = users || {};
    return (
        <section className="the-talk-room">
            <ChatHeader recipientUser={recipientUser} />
            <ChatBody recipientUser={recipientUser} currentUser={currentUser} />
            {/* <ComposeMessage */}
            {/* recipientUser={recipientUser} */}
            {/* currentUser={currentUser} */}
            {/* /> */}
        </section>
    );
};
export default TalkRoom;
