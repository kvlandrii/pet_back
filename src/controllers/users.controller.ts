import { Request, Response } from 'express'
import { getAllUsersService } from '../services/users.service'

export const allUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsersService()
        res.status(200).json({ message: 'Users found successfully', users })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
