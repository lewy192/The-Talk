import { useQuery } from "@apollo/client";
import React, { lazy } from "react";

import "./ChatBody.scss";

const Message = lazy(() => import("./../Message/Message"));

const ChatBody = (props) => {
    const { recipientUser, currentUser } = props;
    // const { data: recipientData, error, loading } = useQuery({});
    // console.log(recipientData);

    return <section className="chat-body">{recipientUser?.username}</section>;
};
export default ChatBody;
