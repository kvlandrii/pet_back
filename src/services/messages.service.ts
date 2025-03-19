import { createMessage, deleteMessage, getMessagesForRoom, updateMessage } from '../repository/messages.repository'

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

export const deleteMessageService = async (messageId: string) => {
    try {
        await deleteMessage(messageId)
    } catch (error) {
        throw new Error(`Error deleting message: ${error instanceof Error ? error.message : String(error)}`)
    }
}

export const updateMessageService = async (messageId: string, content: string) => {
    try {
        await updateMessage(messageId, content)
    } catch (error) {
        throw new Error(`Error updating message: ${error instanceof Error ? error.message : String(error)}`)
    }
}
