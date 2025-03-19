import express from 'express'
import userRouter from './user.routes'
import todosRouter from './todos.routes'
import usersRouter from './users.routes'

const router = express.Router()

router.use('/user', userRouter)
router.use('/users', usersRouter)
router.use('/todos', todosRouter)

export default router
