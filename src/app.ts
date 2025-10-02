import express, { Application, NextFunction, Request, Response } from 'express'
import path from 'path'
import apiRouter from './router/apiRouter'
import globalErrorHandler from './middleware/globalErrorHandler'
import responseMessage from './constant/responseMessage'
import httpError from './utils/httpError'

const app: Application = express()

// Middleware
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/v1', apiRouter)

//404 Handler
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('route'))
    } catch (error) {
        httpError(next, error, req, 404)
    }
})

//Global Error Handler
app.use(globalErrorHandler)

export default app
