import { getAllUsers } from '../repository/users.repository'

export const getAllUsersService = async () => {
    try {
        const users = await getAllUsers()
        if (!users || users.length === 0) {
            throw new Error('No users found')
        }
        return users
    } catch (error) {
        throw new Error(`Error fetching users: ${error instanceof Error ? error.message : String(error)}`)
    }
}
