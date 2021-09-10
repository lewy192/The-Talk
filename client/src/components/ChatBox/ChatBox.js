import React, { useContext } from "react";
import { ChatContext } from "../../context/chatContext";

import "./ChatBox.scss";

const ChatBox = (props) => {
    const { chatUser, currentUser } = props;
    const chatContext = useContext(ChatContext);
    const handleClick = async (e) => {
        console.log(chatUser, currentUser);
        await chatContext.setChatUsers({
            currentUser: currentUser,
            recipientUser: chatUser,
        });
        console.log(chatContext);
    };
    return (
        <article className="chat flex-row" onClick={handleClick}>
            {/* <img src="" alt="" className="profile-picture" /> */}
            <div className="profile-picture"></div>
            <h2 className="chat-name">{chatUser.username}</h2>
        </article>
    );
};

export default ChatBox;
