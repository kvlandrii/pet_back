import { gql } from 'apollo-server-express'

export const todoTypeDefs = gql`
    type Todo {
        id: ID!
        title: String!
        description: String!
        completed: Boolean!
        user: ID!
    }

    input CreateTodoInput {
        title: String!
        description: String!
        completed: Boolean!
    }

    input UpdateTodoInput {
        id: ID!
        title: String!
        description: String!
        completed: Boolean!
    }

    type Query {
        getTodosQuery: [Todo!]!
        getTodoByIdQuery(id: ID!): Todo!
    }

    type Mutation {
        createTodoMutation(input: CreateTodoInput!): Todo!
        updateTodoMutation(input: UpdateTodoInput!): Todo!
        deleteTodoMutation(id: ID!): Todo!
    }
`
