import { Request } from 'express'
import { t_http_error } from '../types/types.js'
import { e_app_env } from '../constants/appenv.js'
import config from '../config/config.js'
import logger from './logger.js'

export default (
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    err: Error | unknown,
    req: Request,
    err_status_code: number = 500
): t_http_error => {
    const error_obj: t_http_error = {
        success: false,
        status_code: err_status_code,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: err instanceof Error ? err.message || 'Something went wrong' : 'Something went wrong',
        data: null,
        trace: err instanceof Error ? { error: err.stack } : null
    }
    logger.error('CONTROLLER_ERROR', {
        meta: error_obj
    })
    if (e_app_env.PROD == config.env) {
        delete error_obj.request.ip
        delete error_obj.trace
    }
    return error_obj
}
