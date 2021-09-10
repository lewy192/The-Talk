import React, { lazy } from "react";

import "./ChatBody.scss";

const Message = lazy(() => import("./../Message/Message"));

const ChatBody = (props) => {
    const { recipientUser, currentUser } = props;

    return <section className="chat-body">{recipientUser?.username}</section>;
};
export default ChatBody;
