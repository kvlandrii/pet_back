import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '../config/env'
import { Conflict } from 'http-errors'
import { getUserByEmail, getUserById, registerUser } from '../repository/user.repository'

export const registerUserService = async (name: string, email: string, password: string) => {
    try {
        const existingUser = await getUserByEmail(email)
        if (existingUser) throw new Conflict('User already exists')

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await registerUser(name, email, hashedPassword)
        if (!user) throw new Error('User registration failed')
        return user
    } catch (error) {
        throw new Error(`Error registering user: ${error instanceof Error ? error.message : String(error)}`)
    }
}

export const loginUserService = async (email: string, password: string) => {
    try {
        const user = await getUserByEmail(email)
        if (!user) throw new Error('User not found')

        const isMatch = await bcrypt.compare(password, user.password as string)
        if (!isMatch) throw new Error('Invalid credentials')

        const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1d' })
        return { user, token }
    } catch (error) {
        throw new Error(`Error logging in user: ${error instanceof Error ? error.message : String(error)}`)
    }
}

export const getUserService = async (id: string) => {
    try {
        const user = await getUserById(id)
        if (!user) throw new Error('User not found')
        return user
    } catch (error) {
        throw new Error(`Error fetching user: ${error instanceof Error ? error.message : String(error)}`)
    }
}
