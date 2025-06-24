import express, { Application, NextFunction, Request, Response } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import helmet from 'helmet'
import corsOptions from './utils/cors.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app: Application = express()

//Middleware
app.use(helmet())

// Cors
app.use(corsOptions)

app.use(express.json())

app.use(express.static(path.join(__dirname, '../', 'public')))

//Routes
import systemRoutes from './router/systemRoute.js'
import globalErrHandler from './utils/globalErrHandler.js'
import message from './constants/messages.js'
import httpError from './utils/httpError.js'

app.use('/app/api/v1/', systemRoutes)

//SITE NOT FOUND
app.use((req: Request, _res: Response, next: NextFunction) => {
    try {
        throw new Error(message.RESOURCE_NOT_FOUND('Route'))
    } catch (error) {
        httpError(next, error, req, 404)
    }
})
//GLobal Error Handler
app.use(globalErrHandler)
export default app
