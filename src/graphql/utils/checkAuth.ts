import { ApolloError } from 'apollo-server-errors'

export const checkAuth = (context: any) => {
    const { user } = context
    if (!user) {
        throw new ApolloError('Unauthorized', 'UNAUTHORIZED')
    }
    return user
}