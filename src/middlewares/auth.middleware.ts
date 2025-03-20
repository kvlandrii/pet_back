import { Request, Response, NextFunction } from 'express'
import { Unauthorized } from 'http-errors'
import { getUserById } from '../repository/user.repository'
import { verifyToken } from '../utils/verifyToken'

export const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return next(new Unauthorized('No token provided'))
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
        return next(new Unauthorized('No token provided'))
    }

    try {
        const decoded = await verifyToken(token)
        const user = await getUserById(decoded.id)

        if (!user) {
            return next(new Unauthorized('User not found'))
        }

        req.user = user
        next()
    } catch {
        return next(new Unauthorized('Invalid token'))
    }
}
