import 'express'

declare module 'express-serve-static-core' {
    export interface Request {
        user?: Express.User
    }
}
