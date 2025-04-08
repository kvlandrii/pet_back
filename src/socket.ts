import { Server } from 'socket.io'
import { createMessageService, deleteMessageService, getMessagesService, updateMessageService } from './services/messages.service'
import { verifyToken } from './utils/verifyToken'
import { getUserById } from './repository/user.repository'

export const socket = (httpServer: any) => {
    const io = new Server(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization'],
        },
    })

    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth?.token.split(' ')[1]

            if (!token) {
                console.error('No token provided')
                return next(new Error('No token provided'))
            }

            const decoded = verifyToken(token)

            const user = await getUserById(decoded.id)
            if (!user) {
                console.error('User not found')
                return next(new Error('User not found'))
            }

            socket.data.user = user
            next()
        } catch (err) {
            console.error('Authentication error:', err)
            next(new Error('Authentication error: ' + err))
        }
    })

    io.on('connection', (socket) => {
        socket.on('join', async (data) => {
            const { partnerId } = data
            const userId = socket.data.user.id
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
            const { roomName, content } = data
            const senderId = socket.data.user.id

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

        socket.on('joinCall', (data) => {
            const { partnerId } = data
            const userId = socket.data.user.id
            const roomName = [userId, partnerId].sort().join('-')

            socket.join(roomName)
            socket.emit('joinedCall', { roomName })
        })

        socket.on('offer', (data) => {
            const { offer, roomName } = data
            socket.to(roomName).emit('offer', { offer })
        })

        socket.on('answer', (data) => {
            const { answer, roomName } = data
            socket.to(roomName).emit('answer', { answer })
        })

        socket.on('iceCandidate', (data) => {
            const { candidate, roomName } = data
            socket.to(roomName).emit('iceCandidate', { candidate })
        })
    })

    return io
}
