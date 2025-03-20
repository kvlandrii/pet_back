import { mergeTypeDefs } from '@graphql-tools/merge'
import { userTypeDefs } from './user.schema'
import { todoTypeDefs } from './todo.schema'

export const typeDefs = mergeTypeDefs([userTypeDefs, todoTypeDefs])
