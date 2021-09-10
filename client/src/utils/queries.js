import { gql } from "@apollo/client";

export const ALL_CHATS = gql`
    query Query($currentUserId: Int!) {
        chats(userId: $currentUserId) {
            id
            username
        }
    }
`;
