import React, { useEffect } from "react";

import "./ComposeMessage.scss";
import { useForm } from "../../hooks/useForm";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "./../../utils/mutations";

export const ComposeMessage = (props) => {
    const [sendMessage, { error }] = useMutation(SEND_MESSAGE);
    const {
        recipientUser: { id: targetId, username: recipientUsername },
        currentUser: { id: userId, username: currentUsername },
    } = props;

    const sendFormMessage = () => {
        const messageContents = formState;
        sendMessage({ variables: { messageContents, targetId, userId } });
    };

    const { formState, handleFormChange, handleFormSubmit } = useForm(
        { messageContents: "" },
        sendFormMessage
    );

    useEffect(() => {
        const listener = handleFormSubmit();
        const form = document.querySelector(".send-message-form");
        form.addEventListener("submit", listener);
        return form.removeEventListener("submit", listener);
    });

    return (
        <div>
            <form className="send-message-form" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    name="message"
                    id="message"
                    onChange={handleFormChange}
                />
                <input type="submit" value="Send" />
            </form>
        </div>
    );
};
