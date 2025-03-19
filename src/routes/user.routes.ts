import express from 'express'
import { loginController, meController, registerController } from '../controllers/user.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const userRouter = express.Router()

userRouter.post('/register', registerController)
userRouter.post('/login', loginController)
userRouter.get('/me', authMiddleware, meController)

export default userRouter
