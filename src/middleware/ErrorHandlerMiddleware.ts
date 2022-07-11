import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { logger } from '../config/logger'
import { ApiError } from '../exceptions/ApiError'

function handleError(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  /* 
    TODO Create a base ErrorResponse class and return to the response.
    TODO Instead os centralizing the error handler here, call another service to handle the error,
    so it can be reusable in another context, like messaging, scheduling and so on.
   */

  logger.error(error)
  if (error instanceof ApiError) {
    return response
      .status(error.status)
      .json({ message: error.message, status: error.status })
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return response.status(400).json({ error })
  }

  if (error instanceof mongoose.Error.CastError) {
    return response.status(400).json({ error })
  }

  return response.status(500).json({ error: error.message })
}

export default handleError

/* Example Class
class ErrorHandler {
  public async handleError(error: Error, responseStream: Response): Promise<void> {
    await logger.logError(error);
    await fireMonitoringMetric(error);
    await crashIfUntrustedErrorOrSendResponse(error, responseStream);
  };
}

export const handler = new ErrorHandler(); 
TODO Remove it
*/
