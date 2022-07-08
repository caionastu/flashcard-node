import { Router } from 'express'
import CardController from '../../controllers/CardController'
import { asyncRequestHandler } from '../../utils/AsyncRequestHandler'

const cardRoutes = Router()

cardRoutes.get('/', asyncRequestHandler(CardController.findAllByDeckId))
cardRoutes.post('/', asyncRequestHandler(CardController.create))
cardRoutes.post('/:id', asyncRequestHandler(CardController.update))
cardRoutes.post(
  '/:id/visit',
  asyncRequestHandler(CardController.updateLastVisit)
)
cardRoutes.delete('/:id', asyncRequestHandler(CardController.delete))

export { cardRoutes }
