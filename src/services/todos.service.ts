import { createTodo, deleteTodo, getAllTodo, getTodoById, updateTodo } from '../repository/todo.repository'

export const createTodoService = async (title: string, description: string, completed: boolean, userId: string) => {
    return await createTodo(title, description, completed, userId)
}

export const getAllTodosService = async (userId: string) => {
    return await getAllTodo(userId)
}

export const deleteTodoService = async (id: string) => {
    return await deleteTodo(id)
}

export const updateTodoService = async (id: string, title: string, description: string, completed: boolean) => {
    return await updateTodo(id, title, description, completed)
}

export const getTodoService = async (id: string) => {
    return await getTodoById(id)
}
