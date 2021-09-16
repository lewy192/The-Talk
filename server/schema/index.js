const typeDefs = require("./TypeDefs");
const resolvers = require("./resolvers");

const { makeExecutableSchema } = require("@graphql-tools/schema");

module.exports.schema = makeExecutableSchema({ resolvers, typeDefs });
