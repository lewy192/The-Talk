import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                id
                username
            }
        }
    }
`;

export const SIGNUP_USER = gql`
    mutation signup($username: String!, $password: String!) {
        signup(username: $username, password: $password) {
            token
            user {
                id
                username
            }
        }
    }
`;

export const SEND_MESSAGE = gql`
    mutation Mutation(
        $messageContents: String!
        $targetId: Int!
        $userId: Int!
    ) {
        sendMessage(
            messageContents: $messageContents
            targetId: $targetId
            userId: $userId
        ) {
            messageContents
            userId
            targetId
            sentAt
        }
    }
`;
