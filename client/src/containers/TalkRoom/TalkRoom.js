import React, { lazy, useState } from "react";
import "./TalkRoom.scss";
const ChatHeader = lazy(() =>
    import("./../../components/ChatHeader/ChatHeader")
);
const ChatBody = lazy(() => import("../../components/ChatBody/ChatBody"));
const ComposeMessage = lazy(() =>
    import("./../../components/ComposeMessage/ComposeMessage")
);

const TalkRoom = (props) => {
    const [talkRoomState, setTalkRoomState] = useState(false);
    const { users } = props;
    const { recipientUser, currentUser } = users || {};
    return (
        <section className="the-talk-room">
            <ChatHeader recipientUser={recipientUser} />
            <ChatBody recipientUser={recipientUser} currentUser={currentUser} />
            <ComposeMessage
                talkRoomState={{ talkRoomState, setTalkRoomState }}
                recipientUser={recipientUser}
                currentUser={currentUser}
            />
            {/* recipientUser={recipientUser.id}
            currentUser={currentUser.username} */}
            {/* /> */}
        </section>
    );
};
export default TalkRoom;
