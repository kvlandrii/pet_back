import { getUserById } from '@/repository/user.repository'
import { verifyToken } from '@/utils/verifyToken'
import { ApolloError } from 'apollo-server-errors'

export const authMiddleware = async (context: any) => {
    const authHeader = context.req.headers.authorization
    if (!authHeader) {
        throw new ApolloError('Authorization header must be provided', 'UNAUTHORIZED')
    }

    const token = authHeader.split('Bearer ')[1]
    if (!token) {
        throw new ApolloError("Authentication token must be 'Bearer [token]'", 'UNAUTHORIZED')
    }

    try {
        const decoded = verifyToken(token)
        const user = await getUserById(decoded.id)

        if (!user) {
            return new ApolloError('User not found', 'UNAUTHORIZED')
        }
        return user
    } catch (err) {
        throw new ApolloError('Invalid/Expired token', 'UNAUTHORIZED')
    }
}
