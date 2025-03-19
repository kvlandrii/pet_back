import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { createTodoController, deleteTodoController, getAllTodosController, updateTodoController } from '../controllers/todos.controller'

const todosRouter = express.Router()

todosRouter.get('', authMiddleware, getAllTodosController)
todosRouter.post('/create', authMiddleware, createTodoController)
todosRouter.delete('/delete', authMiddleware, deleteTodoController)
todosRouter.put('/update/:id', authMiddleware, updateTodoController)

export default todosRouter
