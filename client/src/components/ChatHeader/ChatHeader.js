import React from "react";

import "./ChatHeader.scss";

const ChatHeader = (props) => {
    const { recipientUser } = props;
    return (
        <nav className="chat-header flex">
            <div className="profile-picture"></div>
            <h1 className="recipient-name">{recipientUser?.username}</h1>
        </nav>
    );
};

export default ChatHeader;
