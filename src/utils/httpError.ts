import { NextFunction, Request } from 'express'
import errorObject from './errorObject'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export default (nextFunc: NextFunction, err: Error | unknown, req: Request, errorStatuscode: number = 500): void => {
    const errObj = errorObject(err, req, errorStatuscode)
    return nextFunc(errObj)
}
