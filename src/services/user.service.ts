import bcrypt from 'bcrypt'
import { User } from '../models/user.model'
import jwt from 'jsonwebtoken'
import { config } from '../config/env'

export const registerUser = async (name: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    return await User.create({ name, email, password: hashedPassword })
}

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email })
    if (!user) throw new Error('User not found')

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('Invalid credentials')

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
        expiresIn: '1h',
    })
    return { user, token }
}
