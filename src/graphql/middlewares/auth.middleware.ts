import { User } from '@/models/user.model'
import { verifyToken } from '@/utils/verifyToken'

export const authMiddleware = async ({ req }) => {
    const headerToken = req.headers.authorization || ''
    if (!headerToken) {
        throw new Error('No authorization header provided')
    }

    const token = headerToken.split(' ')[1]
    if (!token) {
        throw new Error('No token provided')
    }

    try {
        const decoded = verifyToken(token)
        const user = await User.findById(decoded.id)

        if (!user) {
            throw new Error('User not found')
        }

        return { user }
    } catch (error: any) {
        throw new Error(error)
    }
}
