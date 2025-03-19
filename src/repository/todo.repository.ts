import { Todo } from '../models/todos.model'
import { User } from '../models/user.model'

export const createTodo = async (title: string, description: string, completed: boolean, userId: string) => {
    return await Todo.create({ title, description, completed, user: await User.findById(userId) })
}

export const getAllTodo = async (userId: string) => {
    return await Todo.find({ user: userId })
}

export const deleteTodo = async (id: string) => {
    return await Todo.findByIdAndDelete(id)
}

export const updateTodo = async (id: string, title: string, description: string, completed: boolean) => {
    return await Todo.findByIdAndUpdate(id, { title, description, completed }, { new: true })
}

export const getTodoById = async (id: string) => {
    return await Todo.findById(id)
}
