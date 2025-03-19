import { config } from './config/env'
import app from './app'
import { connectDB } from './config/db'
import { createServer } from 'http'
import { Server } from 'socket.io'

connectDB()

const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: config.corsOrigin,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    },
})

io.on('connection', (socket) => {
    socket.on('join', (data) => {
        const { userId, partnerId } = data
        const roomName = [userId, partnerId].sort().join('-')

        socket.join(roomName)
        socket.emit('joinedRoom', { roomName: roomName })
    })

    socket.on('message', (data) => {
        const { roomName, message } = data
        io.to(roomName).emit('message', { message: message })
    })
})

httpServer.listen(config.port, () => {
    console.log(`REST and SOCKET server running on http://localhost:${config.port}`)
})
