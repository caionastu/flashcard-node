import { Response } from 'express'
import { logger } from '../config/logger'
import DeckService from '../services/DeckService'
import { RequestContext } from '../utils/RequestContext'
import { DeckResponse } from './responses/DeckResponse'

class DeckController {
  /**
   * @swagger
   * /decks:
   *  get:
   *    tags:
   *      - Decks
   *    summary: Find all Decks by UserId
   *    description: This endpoint will get all decks based on logged user
   *    operationId: findAllDecksByUserId
   *    security: [{ bearerAuth: [] }]
   *    responses:
   *      200:
   *        description: Success
   *      401:
   *        description: Unauthorized
   */
  async findAllByUserId(request: RequestContext, response: Response) {
    const userId = request.userId
    logger.info('Starting request to find all decks by user id: %s.', userId)

    const decks: DeckResponse[] = (
      await DeckService.findAllByUserId(userId)
    ).map((deck) => DeckResponse.from(deck))

    logger.info(
      'Request to find all decks finished. Amount of Decks: %d.',
      decks.length
    )

    response.status(200).send(decks)
  }

  /**
   * @swagger
   * /decks:
   *  post:
   *    tags:
   *      - Decks
   *    summary: Create a new Deck
   *    description: This endpoint will create a new Deck
   *    operationId: createDeck
   *    security: [{ bearerAuth: [] }]
   *    parameters:
   *      - name: body
   *        in: body
   *        schema:
   *          type: object
   *          properties:
   *            title:
   *              type: string
   *              required: true
   *            description:
   *              type: string
   *    responses:
   *      201:
   *        description: Creation Successfull
   *      400:
   *        description: Bad Request
   */
  async create(request: RequestContext, response: Response) {
    logger.info('Starting request to create a new deck.', {
      userId: request.userId
    })

    const deck = await DeckService.create({
      title: request.body.title,
      description: request.body.description,
      userId: request.userId
    })

    logger.info('Deck created: %s.', deck._id)
    response.status(201).send(DeckResponse.from(deck))
  }

  /**
   * @swagger
   * /decks/{id}:
   *  post:
   *    tags:
   *      - Decks
   *    summary: Update a deck
   *    description: This endpoint will update a Deck
   *    operationId: updateDeck
   *    security: [{ bearerAuth: [] }]
   *    parameters:
   *      - name: id
   *        in: path
   *        type: string
   *        required: true
   *        description: Deck Id
   *      - name: body
   *        in: body
   *        schema:
   *          type: object
   *          properties:
   *            title:
   *              type: string
   *              required: true
   *            description:
   *              type: string
   *    responses:
   *      200:
   *        description: Update Successfull
   *      400:
   *        description: Bad Request
   *      403:
   *        description: Forbidden
   */
  async update(request: RequestContext, response: Response) {
    const { id } = request.params

    logger.info('Starting request to update deck: %s', id, {
      userId: request.userId
    })

    const deck = await DeckService.update(id, {
      title: request.body.title,
      description: request.body.description,
      userId: request.userId
    })

    logger.info('Deck updated.')
    return response.status(200).send(DeckResponse.from(deck))
  }

  /**
   * @swagger
   * /decks/{id}:
   *  delete:
   *    tags:
   *      - Decks
   *    summary: Delete a Deck
   *    description: This endpoint will delete a Deck
   *    operationId: deleteDeck
   *    security: [{ bearerAuth: [] }]
   *    parameters:
   *      - name: id
   *        in: path
   *        type: string
   *        required: true
   *        description: Deck Id
   *    responses:
   *      200:
   *        description: Deck Deleted
   *      404:
   *        description: Deck Not Found
   */
  async deleteById(request: RequestContext, response: Response) {
    const { id } = request.params
    const userId = request.userId

    logger.info('Starting request to delete deck: %s', id, { userId: userId })

    await DeckService.deleteById(id, userId)

    logger.info('Deck deleted')
    response.status(200).send()
  }
}

export default new DeckController()
