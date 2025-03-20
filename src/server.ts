import { config } from './config/env'
import { connectDB } from './config/db'
import { createServer } from 'http'
import { socket } from './socket'
import { ApolloServer } from 'apollo-server-express'
import app from './app'
import { authMiddleware } from './graphql/middlewares/auth.middleware'
import { resolvers } from './graphql/resolvers'
import { typeDefs } from './graphql/schemas'

const startServer = async () => {
    connectDB()

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: authMiddleware,
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({ app, path: '/graphql' })

    const httpServer = createServer(app)

    socket(httpServer)

    httpServer.listen(config.port, () => {
        console.log(`GraphQL server running on http://localhost:${config.port}/graphql`)
        console.log(`REST API running on http://localhost:${config.port}/api`)
        console.log(`WebSocket server running on http://localhost:${config.port}`)
    })
}

startServer().catch((error) => {
    console.error(error)
})
