import { Request, Response } from 'express'
import { createTodoService, deleteTodoService, getAllTodosService, getTodoService, updateTodoService } from '../services/todos.service'

export const createTodoController = async (req: Request, res: Response) => {
    try {
        const { title, description, completed } = req.body
        const { id } = req.user
        const todo = await createTodoService(title, description, completed, id)
        res.status(201).json({ message: 'Todo created successfully', todo })
        //eslint-disable-next-line
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const getAllTodosController = async (req: Request, res: Response) => {
    try {
        const { id } = req.user
        const todos = await getAllTodosService(id)
        if (!todos) {
            res.status(404).json({ message: 'Todos not found' })
        }
        res.status(200).json({ message: 'Todos found successfully', todos })
        //eslint-disable-next-line
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteTodoController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const todo = await deleteTodoService(id)
        if (!todo) {
            res.status(404).json({ message: 'Todo not found' })
        }
        res.status(200).json({ message: 'Todo deleted successfully', todo })
        //eslint-disable-next-line
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const updateTodoController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { title, description, completed } = req.body
        const todo = await updateTodoService(id, title, description, completed)
        res.status(200).json({ message: 'Todos updated successfully', todo })
        //eslint-disable-next-line
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const getTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const todo = await getTodoService(id)
        if (!todo) {
            res.status(404).json({ message: 'Todo not found' })
        }
        res.status(200).json({ message: 'Todo found successfully', todo })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
