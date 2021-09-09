const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { typeDefs, resolvers } = require("./schema/index");
require("dotenv").config();
const sequelize = require("./config/connection");
const app = express();
const PORT = process.env.PORT || 3001;
const models = require("./models/index");
// const seed = require("./models/Seed/index");
(async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
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
    });

    await server.start();
    server.applyMiddleware({ app });

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "../client/build")));
    }

    // callback route for google credentials server, tokens are received here after a user authorises the app.
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });

    await sequelize.sync({ force: false });
    await app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
        console.log(
            `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
        );
    });
})();
