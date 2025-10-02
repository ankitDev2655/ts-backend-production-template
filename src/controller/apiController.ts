import { NextFunction, Request, Response } from 'express'
import httpResponse from '../utils/httpResponse'
import responseMessage from '../constant/responseMessage'
import httpError from '../utils/httpError'

export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            throw new Error('Test Error for self API')

            // If no error, send success response
            httpResponse(req, res, 200, responseMessage.SUCCESS, null)
        } catch (error) {
            httpError(next, error, req, 500)
        }
    }
}
