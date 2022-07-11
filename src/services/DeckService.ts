import { logger } from '../config/logger'
import { DeckRequest } from '../controllers/requests/DeckRequest'
import { IDeck } from '../entitites/IDeck'
import { ApiError } from '../exceptions/ApiError'
import DeckRepository from '../repositories/impl/DeckRepository'

class DeckService {
  async findAllByUserId(userId: String): Promise<IDeck[]> {
    return await DeckRepository.findAllByUserId(userId)
  }

  async create(request: DeckRequest): Promise<IDeck> {
    return await DeckRepository.save(request)
  }

  async update(id: string, request: DeckRequest): Promise<IDeck> {
    logger.info('Checking if deck exists by id: %s.', id)
    const deck = await DeckRepository.findById(id)

    if (deck == null) {
      throw new ApiError(`Deck not found with id: ${id}.`, 404)
    }

    this.verifiyUserId(deck, request.userId)

    deck.title = request.title
    deck.description = request.description

    return await DeckRepository.save(deck)
  }

  async deleteById(id: string, userId: string): Promise<void> {
    logger.info('Checking if deck exists by id: %s.', id)
    const deck = await DeckRepository.findById(id)

    this.verifiyUserId(deck, userId)

    await DeckRepository.deleteById(id)
  }

  private verifiyUserId(deck: IDeck, userId: String): void {
    logger.info("Checking if the user is deck's owner.")
    if (deck.userId !== userId) {
      throw new ApiError(
        "The logged user doesn't have access to delete this deck.",
        403
      )
    }
  }
}

export default new DeckService()
