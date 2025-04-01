import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'
import cookiesParser from 'cookie-parser'

dotenv.config()

const app = express()

app.use(
    cors({
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
)

app.use(express.json())
app.use(cookiesParser())
app.use('/api', routes)

export default app
