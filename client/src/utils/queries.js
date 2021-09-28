import { gql } from "@apollo/client";

export const ALL_CHATS = gql`
    query Query($currentUserId: Int!) {
        chats(userId: $currentUserId) {
            id
            username
        }
    }
`;

export const ALL_MESSAGES = gql`
    query Query($userId: Int!, $targetId: Int!) {
        getTargetMessages(userId: $userId, targetId: $targetId) {
            id
            messageContents
            sentAt
            targetId
            userId
        }
    }
`;
