import { createMessage, getMessagesForRoom } from '../repository/messages.repository'

export const getMessagesService = async (roomName: string) => {
    try {
        const messages = await getMessagesForRoom(roomName)
        return messages
    } catch (error) {
        throw new Error(`Error fetching messages: ${error instanceof Error ? error.message : String(error)}`)
    }
}

export const createMessageService = async (message: string, roomName: string, senderId: string) => {
    try {
        const newMessage = await createMessage(message, roomName, senderId)
        return newMessage
    } catch (error) {
        throw new Error(`Error creating messages: ${error instanceof Error ? error.message : String(error)}`)
    }
}
