import { Response, Request } from 'express'
import { loginUser, registerUser } from '../services/user.service'

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body
        const user = await registerUser(name, email, password)
        res.status(201).json({ message: 'User registered successfully', user })
        //eslint-disable-next-line
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const result = await loginUser(email, password)
        res.status(200).json(result)
        //eslint-disable-next-line
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
