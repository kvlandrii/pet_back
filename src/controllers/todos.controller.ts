import { Request, Response } from 'express'
import { createTodoService, deleteTodoService, getAllTodosService, updateTodoService } from '../services/todos.service'

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
        res.status(200).json({ message: 'Todos found successfully', todos })
        //eslint-disable-next-line
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteTodoController = async (req: Request, res: Response) => {
    try {
        const { id } = req.body
        const todo = await deleteTodoService(id)
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
        res.status(200).json({ message: 'Todo updated successfully', todo })
        //eslint-disable-next-line
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
