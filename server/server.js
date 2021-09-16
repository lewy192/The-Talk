const { createServer } = require("http");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const sequelize = require("./config/connection");
const typeDefs = require("./schema/TypeDefs");
const resolvers = require("./schema/resolvers");
const { PubSub } = require("graphql-subscriptions");
const seed = require("./models/Seed/index");

const path = require("path");
require("dotenv").config();

(async () => {
    const pubsub = new PubSub();
    const app = express();
    const PORT = process.env.PORT || 3001;
    //  middlewearm
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    // Routes

    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "../client/build")));
    }
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
    // http server -- needs to be used to handle both http req and also webSockets
    const httpServer = createServer(app);

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    // apollo sever
    const server = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res, pubsub }),
        plugins: [
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subscriptionServer.close();
                        },
                    };
                },
            },
        ],
    });
    // subscription sever
    const subscriptionServer = SubscriptionServer.create(
        {
            schema,
            execute,
            subscribe,
        },
        { server: httpServer, path: server.graphqlPath }
    );

    await server.start();
    await sequelize.sync({ force: false });
    server.applyMiddleware({ app });
    httpServer.listen(PORT, () => {
        console.log(`server is now running on http://localhost:${PORT}`);
        console.log(
            `graphql sandbox is now running on http://localhost:${PORT}${server.graphqlPath}`
        );
    });
})();
