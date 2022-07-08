import { Request, Response, NextFunction } from 'express'
import { logger } from '../config/logger'
import CardService from '../services/CardService'
import { CardResponse } from './responses/CardResponse'

// TODO add Swagger Documentation

class CardController {
  public async findAllByDeckId(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { deckId } = request.params

    logger.info(`Starting request to find all cards by deck id: ${deckId}.`)

    const cards: CardResponse[] = (
      await CardService.findAllByDeckId(deckId)
    ).map((card) => CardResponse.from(card))

    logger.info(
      `Finished request to find all cards by deck id. Total Cards found: ${cards.length}`
    )

    response.status(200).json(cards)
  }

  public async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    logger.info(`Starting request to create new card.`)
    const card = await CardService.create(request.body)

    logger.info(`Request to creat new card finished. Card created: ${card._id}`)
    response.status(201).json(CardResponse.from(card))
  }

  public async update(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { id } = request.params
    logger.info(`Stargin request to update card: ${id}.`)

    const card = await CardService.update(id, request.body)

    logger.info(`Request to update card finished.`)
    response.status(201).json(CardResponse.from(card))
  }

  public async updateLastVisit(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { id } = request.params
    logger.info(`Starting request to update the last visit of the card: ${id}.`)

    const card = await CardService.updateLastVisit(id, request.body)

    logger.info(`Request to update the last visit finished`)
    response.status(201).json(card)
  }

  public async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { id } = request.params
    logger.info(`Starting request to delete a card by id: ${id}.`)

    await CardService.deleteById(id)

    logger.info(`Request to delete a card finished.`)
    response.status(200).send()
  }
}

export default new CardController()
