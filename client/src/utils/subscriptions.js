import { gql } from "@apollo/client";

export const MESSAGE_CREATED_SUBSCRIPTION = gql`
    subscription Subscription($recipientId: Int, $senderId: Int) {
        newMessage(recipientId: $recipientId, senderId: $senderId) {
            id
            messageContents
            targetId
            userId
            sentAt
        }
    }
`;

export const MESSAGE_SUBSCRIPTION = gql`
    subscription Subscription($recipientId: Int!, $senderId: Int!) {
        getTargetMessages(userId: $senderId, targetId: $recipientId) {
            id
            messageContents
            userId
            targetId
            sentAt
        }
    }
`;
