const { gql } = require("apollo-server");

const typeDefs = gql`
    extend type Query {
        profile: User!,
        users: [User!],
        user(id: ID!): User!
    }
    type User @key(fields: "id"){
        id: ID!
        firstname: String!,
        lastname: String!,
        email: String!,
        emailVerified: Boolean!
    }
    type AuthPayLoad {
        token: String!,
        user: User
    }
    type Mutation {
        register(
            firstname: String!, 
            lastname: String!, 
            email: String!, 
            password: String!
            ) : AuthPayLoad

        login(email: String!, password: String!) : AuthPayLoad
    }
`;

module.exports = typeDefs;