import React from "react";
import "./Chats.scss";
import { useQuery } from "@apollo/client";
import { ALL_CHATS } from "../../utils/queries";
import ChatBox from "../../components/ChatBox/ChatBox";
const Chats = (props) => {
    const { user: currentUser } = props;
    const { id: currentUserId } = currentUser;
    const { loading, data } = useQuery(ALL_CHATS, {
        variables: { currentUserId: currentUserId },
    });
    console.log(data);

    // Todo Get all users that aren't the current
    return (
        <div className="chats-container flex-col">
            <h1 className="the-talk-header">The Talk</h1>
            {loading ? (
                <div className="loading">loading...</div>
            ) : (
                data?.chats?.map((user) => (
                    <ChatBox
                        key={user.username}
                        chatUser={user}
                        currentUser={currentUser}
                    />
                ))
            )}
        </div>
    );
};

export default Chats;
