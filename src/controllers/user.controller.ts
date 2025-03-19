import { Response, Request } from 'express'
import { getUserService, loginUserService, registerUserService } from '../services/user.service'

export const registerController = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body
        const user = await registerUserService(name, email, password)
        res.status(201).json({ message: 'User registered successfully', user })
        //eslint-disable-next-line
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const result = await loginUserService(email, password)
        res.status(200).json(result)
        //eslint-disable-next-line
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const meController = async (req: Request, res: Response) => {
    try {
        const id = req.user.id
        const user = await getUserService(id)
        res.status(200).json(user)
        //eslint-disable-next-line
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
