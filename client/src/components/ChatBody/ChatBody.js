import { useQuery } from "@apollo/client";
import React, { lazy, useEffect } from "react";
import { ALL_MESSAGES } from "../../utils/queries.js";
import { MESSAGE_CREATED_SUBSCRIPTION } from "../../utils/subscriptions.js";

import "./ChatBody.scss";

const Message = lazy(() => import("./../Message/Message"));

const ChatBody = (props) => {
    const {
        recipientUser: { id: targetId },
        currentUser: { id: userId },
    } = props;

    const { data, loading, subscribeToMore } = useQuery(ALL_MESSAGES, {
        variables: { targetId: targetId / 1, userId: userId / 1 },
    });

    useEffect(() => {
        return subscribeToMore({
            document: MESSAGE_CREATED_SUBSCRIPTION,
            variables: { recipientId: targetId / 1, senderId: userId / 1 },
            updateQuery: (prev, { subscriptionData }) => {
                const { newMessage } = subscriptionData.data;
                if (!subscriptionData) return prev;
                return {
                    ...prev,
                    getTargetMessages: [...prev.getTargetMessages, newMessage],
                };
            },
        });
    }, [targetId]);
    const { getTargetMessages: messageArray } = data || {};
    return (
        <section className="chat-body">
            {!loading && messageArray ? (
                messageArray.map(
                    (
                        { messageContents, targetId: messageTargetId, id },
                        index
                    ) => {
                        return messageTargetId === targetId ? (
                            <Message
                                messageText={messageContents}
                                isSent={true}
                                key={index}
                            />
                        ) : (
                            <Message
                                messageText={messageContents}
                                isSent={false}
                                key={index}
                            />
                        );
                    }
                )
            ) : (
                <p>Start The Chat!</p>
            )}
        </section>
    );
};
export default ChatBody;
