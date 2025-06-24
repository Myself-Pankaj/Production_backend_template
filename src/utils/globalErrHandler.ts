import { NextFunction, Request, Response } from 'express'
import { t_http_error } from '../types/types.js'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: t_http_error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.status_code).json(err)
}
