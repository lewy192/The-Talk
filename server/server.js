const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { typeDefs, resolvers } = require("./schema/index");
const { makeExecutableSchema } = require("graphql-subscriptions");
const gqlSchema = require("./schema/index");
require("dotenv").config();
const sequelize = require("./config/connection");
const app = express();
const PORT = process.env.PORT || 3001;
const models = require("./models/index");
// const schema = require("./schema/index");

// webSocket imports

const { PubSub } = require("graphql-subscriptions");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");
const { createServer } = require("http");
// const seed = require("./models/Seed/index");
(async () => {
    const pubsub = new PubSub();
    const apolloServer = new ApolloServer(
        {
            typeDefs,
            resolvers,
            context: ({ req, res }) => ({ req, res, pubsub }),
            // context: ({ req }) => console.log(req.headers.authorization),
            // context: ({ req }) => {
            //     const token = req?.headers?.authorization?.split(" ")[1];

            //     if (!token) return { req };

            //     try {
            //         const { data } = jwt.verify(token, secret, {
            //             maxAge: expiration,
            //         });
            //         req.user = data;
            //     } catch (err) {
            //         console.log(err);
            //     }
            //     return { req };
            // },
        },
        {
            subscriptions: {
                onConnect: async (connectionParams, webSocket) => {
                    console.log("xxx");
                    console.log(connectionParams);
                },
            },
        }
    );

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "../client/build")));
    }

    // callback route for google credentials server, tokens are received here after a user authorises the app.
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });

    const server = createServer(app);
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    apolloServer.installSubscriptionHandlers(server);
    await sequelize.sync({ force: false });
    server.listen(PORT, () => {
        new SubscriptionServer(
            {
                execute,
                subscribe,
                typeDefs,
                resolvers,
            },
            { server: server, path: "/subscriptions" }
        );
        console.log(`Server running on ${PORT}`);
        console.log(
            `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
        );
    });
})();
