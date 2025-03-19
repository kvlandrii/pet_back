import { createTodo, deleteTodo, getAllTodo, getTodoById, updateTodo } from '../repository/todo.repository'

export const createTodoService = async (title: string, description: string, completed: boolean, userId: string) => {
    try {
        const todo = await createTodo(title, description, completed, userId)
        if (!todo) {
            throw new Error('Todo creation failed: No todo returned')
        }
        return todo
    } catch (error) {
        throw new Error(`Error creating todo: ${error instanceof Error ? error.message : String(error)}`)
    }
}

export const getAllTodosService = async (userId: string) => {
    try {
        const todos = await getAllTodo(userId)
        if (!todos || todos.length === 0) {
            throw new Error('No todos found for user')
        }
        return todos
    } catch (error) {
        throw new Error(`Error fetching todos: ${error instanceof Error ? error.message : String(error)}`)
    }
}

export const deleteTodoService = async (id: string) => {
    try {
        const deletedTodo = await deleteTodo(id)
        if (!deletedTodo) {
            throw new Error('Todo deletion failed: Todo not found or not deleted')
        }
        return deletedTodo
    } catch (error) {
        throw new Error(`Error deleting todo: ${error instanceof Error ? error.message : String(error)}`)
    }
}

export const updateTodoService = async (id: string, title: string, description: string, completed: boolean) => {
    try {
        const updatedTodo = await updateTodo(id, title, description, completed)
        if (!updatedTodo) {
            throw new Error('Todo update failed: Todo not found')
        }
        return updatedTodo
    } catch (error) {
        throw new Error(`Error updating todo: ${error instanceof Error ? error.message : String(error)}`)
    }
}

export const getTodoService = async (id: string) => {
    try {
        const todo = await getTodoById(id)
        if (!todo) {
            throw new Error('Todo not found')
        }
        return todo
    } catch (error) {
        throw new Error(`Error fetching todo: ${error instanceof Error ? error.message : String(error)}`)
    }
}
