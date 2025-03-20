import jwt from 'jsonwebtoken'
import { config } from '../config/env'

export const verifyToken = (token: string) => {
    if (!token) {
        throw new Error('No token provided')
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret) as { id: string }
        return decoded
    } catch (error: any) {
        throw new Error(error)
    }
}
