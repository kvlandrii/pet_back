import jwt from 'jsonwebtoken'
import { User } from '../../models/user.model'
import { ApolloError, UserInputError } from 'apollo-server-errors'
import { config } from '@/config/env'
import bcrypt from 'bcrypt'
import { checkAuth } from '../utils/checkAuth'

type LoginUserInput = {
    input: {
        email: string
        password: string
    }
}

type RegisterUserInput = {
    input: {
        name: string
        email: string
        password: string
    }
}

export const userResolvers = {
    Query: {
        getUsersQuery: async (_: any, __: any, context: any) => {
            checkAuth(context)

            try {
                const users = await User.find()
                if (!users) {
                    throw new ApolloError('No users found', 'NOT_FOUND')
                }
                return users
            } catch (error) {
                throw new ApolloError(error instanceof Error ? error.message : 'Failed to fetch users', 'INTERNAL_SERVER_ERROR')
            }
        },

        getUserByIdQuery: async (_: any, { id }: { id: string }, context: any) => {
            checkAuth(context)

            try {
                const user = await User.findById(id)
                if (!user) {
                    throw new ApolloError('User not found', 'NOT_FOUND')
                }
                return user
            } catch (error) {
                throw new ApolloError(error instanceof Error ? error.message : 'Failed to fetch user', 'INTERNAL_SERVER_ERROR')
            }
        },

        getMeQuery: async (_: any, __: any, context: any) => {
            const user = checkAuth(context)

            try {
                const currentUser = await User.findById(user.id)
                if (!currentUser) {
                    throw new ApolloError('User not found', 'NOT_FOUND')
                }
                return currentUser
            } catch (error) {
                throw new ApolloError(error instanceof Error ? error.message : 'Failed to fetch current user', 'INTERNAL_SERVER_ERROR')
            }
        },
    },

    Mutation: {
        registerUserMutation: async (_: any, args: RegisterUserInput) => {
            const { name, email, password } = args.input

            try {
                if (!name || !email || !password) {
                    throw new UserInputError('Name, email, and password are required')
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailRegex.test(email)) {
                    throw new UserInputError('Invalid email format')
                }

                const existingUser = await User.findOne({ email })
                if (existingUser) {
                    throw new ApolloError('Email is already in use', 'CONFLICT')
                }

                const hashedPassword = await bcrypt.hash(password, 10)

                const user = await User.create({ name, email, password: hashedPassword })
                if (!user) {
                    throw new ApolloError('User registration failed', 'BAD_REQUEST')
                }

                return user
            } catch (error) {
                throw new ApolloError(error instanceof Error ? error.message : 'Failed to create user', 'INTERNAL_SERVER_ERROR')
            }
        },

        loginUserMutation: async (_: any, args: LoginUserInput) => {
            const { email, password } = args.input
            try {
                if (!email || !password) {
                    throw new UserInputError('Email and password are required')
                }

                const user = await User.findOne({ email })
                if (!user) {
                    throw new ApolloError('Invalid email or password', 'UNAUTHORIZED')
                }

                const isMatch = await bcrypt.compare(password, user.password)
                if (!isMatch) {
                    throw new ApolloError('Invalid email or password', 'UNAUTHORIZED')
                }

                const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1d' })

                return { user, token }
            } catch (error) {
                throw new ApolloError(error instanceof Error ? error.message : 'Failed to login', 'INTERNAL_SERVER_ERROR')
            }
        },
    },
}
