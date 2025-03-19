import jwt from 'jsonwebtoken'
import { config } from '../config/env'

export const verifyToken = (token: string) => {
    return jwt.verify(token, config.jwtSecret) as { id: string }
}
