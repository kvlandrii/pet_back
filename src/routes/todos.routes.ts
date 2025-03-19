import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { createTodoController, deleteTodoController, getAllTodosController, getTodo, updateTodoController } from '../controllers/todos.controller'

const todosRouter = express.Router()

todosRouter.get('', authMiddleware, getAllTodosController)
todosRouter.get('/:id', authMiddleware, getTodo)
todosRouter.post('/create', authMiddleware, createTodoController)
todosRouter.delete('/delete/:id', authMiddleware, deleteTodoController)
todosRouter.put('/update/:id', authMiddleware, updateTodoController)

export default todosRouter
