import React from "react";

import "./ComposeMessage.scss";
import { useForm } from "../../hooks/useForm";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "./../../utils/mutations";

const ComposeMessage = (props) => {
    const [sendMessage] = useMutation(SEND_MESSAGE);
    const {
        recipientUser: { id: targetId },
        currentUser: { id: userId },
    } = props;

    const sendFormMessage = () => {
        const { message: messageContents } = formState;
        sendMessage({
            variables: {
                messageContents,
                targetId: Number(targetId),
                userId: userId / 1,
            },
        });
    };

    const { formState, handleFormChange, handleFormSubmit } = useForm(
        { message: "" },
        sendFormMessage
    );
    const { message } = formState;

    return (
        <div>
            <form
                className="send-message-form flex-row"
                onSubmit={handleFormSubmit}
            >
                <textarea
                    type="text"
                    name="message"
                    id="message"
                    placeholder="Enter Message Here.."
                    rows={1}
                    value={message}
                    onChange={handleFormChange}
                />
                <input type="submit" value="Send" />
            </form>
        </div>
    );
};

export default ComposeMessage;
