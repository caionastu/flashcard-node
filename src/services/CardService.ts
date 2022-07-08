import { logger } from '../config/logger'
import { CardRequest } from '../controllers/requests/CardRequest'
import { LastVisitRequest } from '../controllers/requests/LastVisitRequest'
import { Difficulties, ICard } from '../entitites/ICard'
import { ApiError } from '../exceptions/ApiError'
import CardRepository from '../repositories/impl/CardRepository'
import DeckRepository from '../repositories/impl/DeckRepository'

class CardService {
  async findAllByDeckId(deckId: string): Promise<ICard[]> {
    this.validateDeck(deckId)
    return await CardRepository.findAllByDeckId(deckId)
  }

  async create(request: CardRequest): Promise<ICard> {
    this.validateDeck(request.deckId)

    const card: ICard = {
      content: request.content,
      notes: request.notes,
      createdAt: new Date(),
      deckId: request.deckId,
      lastVisit: {
        date: new Date(),
        difficulty: Difficulties.NEW,
        nextVisit: new Date()
      },
      visitCount: 0
    }

    return await CardRepository.save(card)
  }

  async update(id: string, request: CardRequest): Promise<ICard> {
    const card = await this.findById(id)

    card.content = request.content
    card.notes = request.notes

    return await CardRepository.save(card)
  }

  async updateLastVisit(id: string, request: LastVisitRequest) {
    const card = await this.findById(id)

    let nextVisit: Date = new Date()
    switch (request.difficulty) {
      case Difficulties.EASY: {
        nextVisit.setDate(nextVisit.getDate() + 3)
        break
      }
      case Difficulties.MODERATE: {
        nextVisit.setDate(nextVisit.getDate() + 2)
        break
      }
      case Difficulties.HARD: {
        nextVisit.setDate(nextVisit.getDate() + 1)
        break
      }
    }

    card.lastVisit = {
      difficulty: request.difficulty,
      date: new Date(),
      nextVisit: nextVisit
    }
    card.visitCount += 1

    return await CardRepository.save(card)
  }

  async deleteById(id: string): Promise<void> {
    await this.findById(id)
    await CardRepository.deleteById(id)
  }

  private async validateDeck(deckId: string): Promise<void> {
    logger.info(`Checking if card's deck exists by deckId: ${deckId}.`)
    const exists = await DeckRepository.existsById(deckId)
    if (!exists) {
      throw new ApiError(`Deck not found by id: ${deckId}.`, 404)
    }
  }

  private async findById(id: string): Promise<ICard> {
    logger.info(`Finding card by id: ${id}.`)
    const card = await CardRepository.findById(id)
    if (!card) {
      throw new ApiError(`Card not found by id: ${id}.`, 404)
    }
    return card
  }
}

export default new CardService()
