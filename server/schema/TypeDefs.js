const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        id: ID
        username: String!
        password: String
    }

    type Message {
        id: ID
        messageContents: String
        userId: Int
        targetId: Int
        sentAt: String
    }
    type AuthenticatedUser {
        token: String
        user: User
    }

    type Query {
        users: [User]!
        user(userId: ID!): User
        getTargetMessages(userId: Int!, targetId: Int!): [Message]
        getUserMessages(userId: Int!): [Message]
    }
    type Mutation {
        login(username: String!, password: String!): AuthenticatedUser
        signup(username: String!, password: String!): AuthenticatedUser
        sendMessage(
            userId: Int!
            targetId: Int!
            messageContents: String!
        ): Boolean
    }
`;

module.exports = typeDefs;