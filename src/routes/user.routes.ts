import express from 'express'
import { login, me, register } from '../controllers/user.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/:id', authMiddleware, me)

export default userRouter
