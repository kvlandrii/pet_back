import { Messages } from '../models/messages.model'
import { User } from '../models/user.model'

export const getMessagesForRoom = async (roomName: string) => {
    const messages = await Messages.find({ roomName: roomName }).sort({ createdAt: 1 })
    const messagesWithSender = await Promise.all(
        messages.map(async (message) => {
            const sender = await User.findById(message.sender)
            return { ...message.toJSON(), sender }
        })
    )
    return messagesWithSender
}

export const createMessage = async (message: string, roomName: string, senderId: string) => {
    const newMessage = await Messages.create({ content: message, roomName: roomName, sender: await User.findById(senderId) })
    const messageWithSender = { ...newMessage.toJSON(), sender: await User.findById(senderId) }
    return messageWithSender
}

export const deleteMessage = async (messageId: string) => {
    return await Messages.deleteOne({ _id: messageId })
}

export const updateMessage = async (messageId: string, content: string) => {
    return await Messages.updateOne({ _id: messageId }, { content })
}
