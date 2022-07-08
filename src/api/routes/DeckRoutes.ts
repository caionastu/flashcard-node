import { Router } from 'express'
import DeckController from '../../controllers/DeckController'
import { asyncRequestHandler } from '../../utils/AsyncRequestHandler'

const deckRoutes = Router()

deckRoutes.get('/', asyncRequestHandler(DeckController.findAllByUserId))
deckRoutes.post('/', asyncRequestHandler(DeckController.create))
deckRoutes.post('/:id', asyncRequestHandler(DeckController.update))
deckRoutes.delete('/:id', asyncRequestHandler(DeckController.deleteById))

export { deckRoutes }
