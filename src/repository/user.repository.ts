import { User } from '../models/user.model'

export const getUserByEmail = async (email: string) => {
    return await User.findOne({ email })
}

export const registerUser = async (name: string, email: string, password: string) => {
    return await User.create({ name, email, password })
}

export const getUserById = async (id: string) => {
    return await User.findById(id)
}
