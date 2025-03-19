import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { config } from '../config/env'
import { Unauthorized } from 'http-errors'

export const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return next(new Unauthorized('No token provided'))
    }

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
            return next(new Unauthorized('Invalid token'))
        }

        req.user = decoded
        next()
    })
}
