require('dotenv').config();
require('./config/database').connect();
const { ApolloServer } = require("apollo-server");
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');
const { verifyJWT } = require('./utils/jwt');


const gateway = new ApolloGateway({
    serviceList: [
        { name: "users", url: "http://localhost:4001/graphql" },
    ],
    buildService({ name, url })
    {
        return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context })
            {
                request.http.headers.set(
                    'user',
                    context.user ? JSON.stringify(context.user) : null
                );
            }
        });
    }
});

const server = new ApolloServer({
    gateway,
    context: async ({ req }) =>
    {
        const token = req.get('Authorization') || '';
        const currentUser = await verifyJWT(token.replace('Bearer ', ''));
        // console.log(currentUser);
        return { user: currentUser };
    },
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) =>
{
    console.log(`🚀 Server ready at ${url}`);
});


