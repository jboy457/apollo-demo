require('dotenv').config();
require('../../config/database').connect();

const { ApolloServer } = require("apollo-server");
const { buildFederatedSchema } = require('@apollo/federation');
// const { ApolloServerPluginInlineTrace } = require("apollo-server-core");
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

const server = new ApolloServer({
    schema: buildFederatedSchema([
        {
            typeDefs,
            resolvers,
        }
    ]),
    context: ({ req }) =>
    {
        const user = req.headers.user != null ? JSON.parse(req.headers.user) : null;
        return user;
    }
});

server.listen({ port: 4001 }).then(({ url }) =>
{
    console.log(`🚀 User service is ready at ${url}`);
});