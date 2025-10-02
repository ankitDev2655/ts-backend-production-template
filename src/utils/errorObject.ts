import { Request } from 'express'
import { THttpError } from '../types/types'
import responseMessage from '../constant/responseMessage'
import config from '../config/config'
import { EApllicationEnvironement } from '../constant/application'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export default (err: Error | unknown, req: Request, errorStatuscode: number = 500): THttpError => {
    const errorObject: THttpError = {
        success: false,
        statusCode: errorStatuscode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: err instanceof Error ? err.message || responseMessage.SOMETHING_WENT_WRONG : responseMessage.SOMETHING_WENT_WRONG,
        data: null,
        trace: err instanceof Error ? { stack: err.stack } : null
    }

    // Log
    console.error(`CONTROLLER_ERROR`, {
        meta: errorObject
    })

    //Production ENV Check
    if (config.ENV === EApllicationEnvironement.PRODUCTION) {
        delete errorObject.request.ip // Remove IP address from response in production for security reasons
        delete errorObject.trace // Remove error trace from response in production for security reasons
        if (errorObject.statusCode === 500) {
            errorObject.message = responseMessage.INTERNAL_SERVER_ERROR // Generic message for internal server errors in production
        }
    }

    return errorObject
}
