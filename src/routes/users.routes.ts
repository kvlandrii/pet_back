import express from 'express'
import { allUsersController } from '../controllers/users.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const usersRouter = express.Router()

usersRouter.get('/all', authMiddleware, allUsersController)

export default usersRouter
