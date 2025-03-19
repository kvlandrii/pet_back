import express from 'express'
import userRouter from './user.routes'
import todosRouter from './todos.routes'

const router = express.Router()

router.use('/user', userRouter)
router.use('/todos', todosRouter)

export default router
