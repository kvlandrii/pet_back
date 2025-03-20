import { Todo } from '@/models/todos.model'
import { ApolloError } from 'apollo-server-express'
import { checkAuth } from '../utils/checkAuth'

type CreateTodoInput = {
    input: {
        title: string
        description: string
        completed: boolean
    }
}

type UpdateTodoInput = {
    input: {
        id: string
        title: string
        description: string
        completed: boolean
    }
}

type DeleteTodoInput = {
    id: string
}

export const todoResolvers = {
    Query: {
        getTodosQuery: async (_: any, __: any, context: any) => {
            const user = checkAuth(context)

            try {
                const todos = await Todo.find({ user: user.id }).populate('user')
                if (!todos) {
                    throw new ApolloError('No todos found', 'NOT_FOUND')
                }
                return todos
            } catch (error) {
                throw new ApolloError(error instanceof Error ? error.message : 'Failed to fetch todos', 'INTERNAL_SERVER_ERROR')
            }
        },

        getTodoByIdQuery: async (_: any, { id }: { id: string }, context: any) => {
            const user = checkAuth(context)

            try {
                const todo = await Todo.findById(id).populate('user')
                if (!todo) {
                    throw new ApolloError('Todo not found', 'NOT_FOUND')
                }
                if (todo.user?.toString() !== user.id) {
                    throw new ApolloError('Unauthorized access', 'UNAUTHORIZED')
                }
                return todo
            } catch (error) {
                throw new ApolloError(error instanceof Error ? error.message : 'Failed to fetch todo', 'INTERNAL_SERVER_ERROR')
            }
        },
    },
    Mutation: {
        createTodoMutation: async (_: any, args: CreateTodoInput, context: any) => {
            const user = checkAuth(context)
            const { title, description, completed } = args.input

            try {
                const todo = await Todo.create({ title, description, completed, user: user.id })
                if (!todo) {
                    throw new ApolloError('Failed to create todo', 'INTERNAL_SERVER_ERROR')
                }
                return todo.populate('user')
            } catch (error) {
                throw new ApolloError(error instanceof Error ? error.message : 'Failed to create todo', 'INTERNAL_SERVER_ERROR')
            }
        },

        updateTodoMutation: async (_: any, args: UpdateTodoInput, context: any) => {
            const user = checkAuth(context)
            const { id, title, description, completed } = args.input

            try {
                const todo = await Todo.findById(id).populate('user')
                if (!todo) {
                    throw new ApolloError('Todo not found', 'NOT_FOUND')
                }
                if (todo.user?.toString() !== user.id) {
                    throw new ApolloError('Unauthorized access', 'UNAUTHORIZED')
                }

                const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description, completed }, { new: true })
                return updatedTodo
            } catch (error) {
                throw new ApolloError(error instanceof Error ? error.message : 'Failed to update todo', 'INTERNAL_SERVER_ERROR')
            }
        },

        deleteTodoMutation: async (_: any, args: DeleteTodoInput, context: any) => {
            const user = checkAuth(context)
            const { id } = args
            try {
                const todo = await Todo.findById(id).populate('user')
                if (!todo) {
                    throw new ApolloError('Todo not found', 'NOT_FOUND')
                }
                if (todo.user?.toString() !== user.id) {
                    throw new ApolloError('Unauthorized access', 'UNAUTHORIZED')
                }

                await Todo.deleteOne({ _id: id })
                return todo
            } catch (error) {
                throw new ApolloError(error instanceof Error ? error.message : 'Failed to delete todo', 'INTERNAL_SERVER_ERROR')
            }
        },
    },
}
