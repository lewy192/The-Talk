import React from "react";

const Message = (props) => {
    const { isSent, messageText } = props;
    const theme = isSent ? "sent" : "received";
    return (
        <article className={`message-card ${theme}`}>
            <div className="profile-picture"></div>
            <p className="message-contents">{messageText}</p>
        </article>
    );
};
export default Message;
