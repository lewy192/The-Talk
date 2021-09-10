import React from "react";

import "./ChatBox.scss";

const ChatBox = (props) => {
    const { name } = props;
    return (
        <article className="chat flex-row">
            {/* <img src="" alt="" className="profile-picture" /> */}
            <div className="profile-picture"></div>
            <h2 className="chat-name">{name}</h2>
        </article>
    );
};

export default ChatBox;
