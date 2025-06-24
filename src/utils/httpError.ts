import { NextFunction, Request } from 'express'
import error_obj from './errorHandler.js'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export default (nextFun: NextFunction, err: Error | unknown, req: Request, err_status_code: number = 500): void => {
    const errorObj = error_obj(err, req, err_status_code)

    return nextFun(errorObj)
}
