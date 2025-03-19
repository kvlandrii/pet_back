import { Server } from 'socket.io'
import { config } from './config/env'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        console.log(`Socket connected: ${socket.id}`)

        socket.on('join', (data) => {
            const { userId, partnerId } = data
            const roomName = [userId, partnerId].sort().join('-')
            socket.join(roomName)
            socket.emit('joinedRoom', { roomName })
        })

        socket.on('message', (data) => {
            const { roomName, message } = data
            io.to(roomName).emit('message', { message })
        })

        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`)
        })
    })

    return io
}
