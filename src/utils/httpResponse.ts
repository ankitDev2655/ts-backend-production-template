import { Request, Response } from 'express'
import { THttpResponse } from '../types/types'
import config from '../config/config'
import { EApllicationEnvironement } from '../constant/application'

export default (req: Request, res: Response, responseStatusCode: number, responseMessage: string, responseData: object | null): void => {
    const httpResponse: THttpResponse = {
        success: true,
        statusCode: responseStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: responseMessage,
        data: responseData
    }

    // Log
    console.info(`CONTROLLER_RESPONSE`, {
        meta: httpResponse
    })

    //Production ENV Check
    if (config.ENV === EApllicationEnvironement.PRODUCTION) {
        delete httpResponse.request.ip // Remove IP address from response in production for security reasons
    }

    res.status(responseStatusCode).json(httpResponse)
}
