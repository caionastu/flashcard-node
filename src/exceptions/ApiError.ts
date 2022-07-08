export class ApiError extends Error {
  public message: string
  public status: number
  public cause?: Error

  constructor(message: string, status: number = 500, cause?: Error) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)

    this.message = message
    this.status = status
    this.cause = cause

    Error.captureStackTrace(this)
  }
}
