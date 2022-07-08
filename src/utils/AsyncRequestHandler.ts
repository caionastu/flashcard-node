import { Request, Response, NextFunction, RequestHandler } from 'express'

export const asyncRequestHandler =
  (requestHandler: RequestHandler) =>
  (request: Request, response: Response, next: NextFunction) => {
    return Promise.resolve(requestHandler(request, response, next)).catch(next)
  }
