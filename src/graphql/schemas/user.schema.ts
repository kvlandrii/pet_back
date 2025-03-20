import { gql } from 'apollo-server-express'

export const userTypeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type AuthPayload {
        user: User!
        token: String!
    }

    input RegisterUserInput {
        name: String!
        email: String!
        password: String!
    }

    input LoginUserInput {
        email: String!
        password: String!
    }

    type Query {
        getUsersQuery: [User!]!
        getUserByIdQuery(id: ID!): User!
        getMeQuery: User!
    }

    type Mutation {
        registerUserMutation(input: RegisterUserInput!): User!
        loginUserMutation(input: LoginUserInput!): AuthPayload!
    }
`
