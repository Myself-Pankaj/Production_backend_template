import { NextFunction, Request, Response } from 'express'
import httpResponse from '../utils/httpResponse.js'
import httpError from '../utils/httpError.js'
// import CustomError from '../utils/customError.js'

export default {
    self_status: (req: Request, res: Response, next: NextFunction) => {
        try {
            // throw new CustomError('Hey everthing working', 400);
            httpResponse(req, res, 200, 'Operation Success')
        } catch (error) {
            httpError(next, error, req, 500)
        }
    }
}
