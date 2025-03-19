import { Server } from 'socket.io'
import { config } from './config/env'
import { createMessageService, deleteMessageService, getMessagesService, updateMessageService } from './services/messages.service'

// eslint-disable-next-line
export const socket = (httpServer: any) => {
    const io = new Server(httpServer, {
        cors: {
            origin: config.corsOrigin,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization'],
        },
    })

    io.on('connection', (socket) => {
        socket.on('join', async (data) => {
            const { userId, partnerId } = data
            const roomName = [userId, partnerId].sort().join('-')

            socket.join(roomName)

            try {
                const messages = await getMessagesService(roomName)
                socket.emit('joinedRoom', { roomName: roomName, messages: messages })
            } catch (error) {
                socket.emit('error', { message: error })
            }
        })

        socket.on('message', async (data) => {
            const { roomName, content, senderId } = data

            try {
                const newMessage = await createMessageService(content, roomName, senderId)
                io.to(roomName).emit('message', {
                    message: newMessage,
                })
            } catch (error) {
                socket.emit('error', { message: error })
            }
        })

        socket.on('deleteMessage', async (data) => {
            const { messageId, roomName } = data

            try {
                await deleteMessageService(messageId)
                const messages = await getMessagesService(roomName)

                io.to(roomName).emit('deleteMessage', {
                    messages: messages,
                })
            } catch (error) {
                socket.emit('error', { message: error })
            }
        })

        socket.on('updateMessage', async (data) => {
            const { messageId, content, roomName } = data

            try {
                await updateMessageService(messageId, content)
                const messages = await getMessagesService(roomName)

                io.to(roomName).emit('updateMessage', {
                    messages: messages,
                })
            } catch (error) {
                socket.emit('error', { message: error })
            }
        })
    })

    return io
}
