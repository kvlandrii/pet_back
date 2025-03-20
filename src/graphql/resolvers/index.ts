import { mergeResolvers } from '@graphql-tools/merge'
import { userResolvers } from './user.resolver'
import { todoResolvers } from './todo.resolver'

export const resolvers = mergeResolvers([userResolvers, todoResolvers])
