import { Router } from 'express'
import AuthorizationMiddleware from '../middleware/AuthorizationMiddleware'
import { deckRoutes } from './routes/DeckRoutes'
import { cardRoutes } from './routes/CardRoutes'

const v1Router = Router()

v1Router.use('/api/v1/decks', AuthorizationMiddleware.verifyToken, deckRoutes)
v1Router.use(
  '/api/v1/decks/:deckId/cards',
  AuthorizationMiddleware.verifyToken,
  cardRoutes
)

export { v1Router }
