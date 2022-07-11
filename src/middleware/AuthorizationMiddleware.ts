import { Response, NextFunction } from 'express'
import { ApiError } from '../exceptions/ApiError'
import { RequestContext } from '../utils/RequestContext'

const mockedUserId = '3uWDW4PgXsg4KueL8D9ywdH1IwA2'

class AuthorizationMiddleware {
  verifyToken(request: RequestContext, response: Response, next: NextFunction) {
    const authorization = request.headers.authorization

    /* TODO: Verify if the auth token is valid */

    // admin
    //   .auth()
    //   .verifyIdToken(req.headers.authorization)
    //   .then((token) => {
    //     console.log(`authorized: ${token.uid}`)
    //     req.userId = token.uid
    //     next()
    //   })
    //   .catch((error) => {
    //     console.log('not authorized')
    //     console.log(error)
    //     response.status(403).send()
    //   })

    /* Mocked authorization */

    if (authorization === mockedUserId) {
      request.userId = mockedUserId
      next()
    } else {
      throw new ApiError('Unauthorized', 401)
    }
  }
}

export default new AuthorizationMiddleware()
