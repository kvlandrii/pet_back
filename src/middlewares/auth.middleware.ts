import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { config } from '../config/env'
import { Unauthorized } from 'http-errors'
import { getUserById } from '../repository/user.repository'

export const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return next(new Unauthorized('No token provided'))
    }

    let tokenPayload

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err || !decoded) {
            return next(new Unauthorized('Invalid token'))
        }

        tokenPayload = decoded as { id: string }
    })

    const user = await getUserById(tokenPayload!.id)

    if (!user) {
        return next(new Unauthorized('User not found'))
    }

    req.user = user

    next()
}
