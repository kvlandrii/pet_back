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
    console.log('New user connected: ', socket.id)

    const roomName = 'global'

    socket.join(roomName)

    socket.on('message', (data) => {
        io.to(roomName).emit('message', data)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected: ', socket.id)
    })
})

httpServer.listen(config.port, () => {
    console.log(`REST and SOCKET server running on http://localhost:${config.port}`)
})
