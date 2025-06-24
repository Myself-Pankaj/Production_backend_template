import { Request, Response } from 'express'
import { t_http_response } from '../types/types.js'
import { e_app_env } from '../constants/appenv.js'
import config from '../config/config.js'
import logger from './logger.js'

export default (req: Request, res: Response, res_code: number, res_message: string, data: unknown = null): void => {
    const response: t_http_response = {
        success: true,
        status_code: res.statusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: res_message,
        data: data
    }
    logger.info('Controller Response', {
        meta: response
    })

    if (e_app_env.PROD == config.env) {
        delete response.request.ip
    }
    res.status(res_code).json(response)
}
