import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { config } from '../config/env'
import { Unauthorized } from 'http-errors'
import { getUserById } from '../repository/user.repository'

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
        const decoded = jwt.verify(token, config.jwtSecret) as { id: string }
        const user = await getUserById(decoded.id)

        if (!user) {
            return next(new Unauthorized('User not found'))
        }

        req.user = user
        next()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return next(new Unauthorized('Invalid token'))
    }
}
