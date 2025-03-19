import { config } from './config/env'
import app from './app'
import { connectDB } from './config/db'
import { createServer } from 'http'
import { socket } from './socket'

connectDB()

const httpServer = createServer(app)

socket(httpServer)

httpServer.listen(config.port, () => {
    console.log(`REST and SOCKET server running on http://localhost:${config.port}`)
})
